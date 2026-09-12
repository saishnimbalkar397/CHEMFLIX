/**
 * js/auth.js
 * All Firebase Auth logic: signup, login, email verification, error mapping.
 *
 * Dependencies (loaded before this file):
 *  - js/firebase.js  -> window.firebaseAuth, window.firebaseDb
 *  - js/ui-utils.js  -> window.uiUtils.showToast
 *  - js/modal.js     -> window.modal.promptPassword, window.modal.show/hide
 *
 * Contribution guide:
 *  - Keep each function focused on a single responsibility.
 *  - All user-facing messages must go through uiUtils.showToast or updateModal().
 *  - Never call prompt() — use modal.promptPassword() instead.
 */
(function () {
  "use strict";

  // -- Helpers ----------------------------------------------------------------

  /** Map Firebase auth error codes to human-readable messages. */
  function mapAuthError(code, fallback) {
    var MAP = {
      "auth/email-already-in-use":    "This email is already registered. Please sign in instead.",
      "auth/invalid-email":           "Please enter a valid email address.",
      "auth/operation-not-allowed":   "Email registration is not enabled. Please contact support.",
      "auth/weak-password":           "Password is too weak. Please choose a stronger password (min 6 chars).",
      "auth/user-not-found":          "No account found with this email. Please register first.",
      "auth/wrong-password":          "Incorrect password. Please try again.",
      "auth/invalid-credential":      "Invalid credentials. Please check your email and password.",
      "auth/too-many-requests":       "Too many attempts. Please try again later.",
      "auth/network-request-failed":  "Network error. Please check your connection and try again."
    };
    return MAP[code] || fallback || "An unexpected error occurred. Please try again.";
  }

  function toast(msg, type) {
    if (window.uiUtils && window.uiUtils.showToast) {
      window.uiUtils.showToast(msg, type || "info");
    } else {
      console.warn("[auth.js] uiUtils not available:", msg);
    }
  }

  // -- Signup ----------------------------------------------------------------

  /**
   * Create a new user account, send a verification email, then sign out.
   * @param {string} email
   * @param {string} password
   * @param {string} fullName
   * @returns {Promise<{success:boolean, user:object}>}
   */
  async function handleSignup(email, password, fullName) {
    var auth = window.firebaseAuth;
    var db   = window.firebaseDb;

    if (!auth) throw new Error("Firebase not ready. Please refresh and try again.");

    // 1. Create the account
    var cred = await auth.createUserWithEmailAndPassword(email, password)
      .catch(function (err) {
        throw new Error(mapAuthError(err.code, err.message));
      });
    var user = cred.user;

    // 2. Run profile update + verification send in parallel
    var ops = [];
    var trimmedName = (fullName || "").trim();
    if (trimmedName) {
      ops.push(user.updateProfile({ displayName: trimmedName }));
    }
    ops.push(
      user.sendEmailVerification().catch(function (err) {
        console.error("[auth.js] sendEmailVerification failed:", err);
        throw err;
      })
    );
    await Promise.all(ops);

    // 3. Save user record in Firestore (non-blocking)
    if (db) {
      db.collection("users").doc(user.uid).set({
        email:                email,
        displayName:          trimmedName || null,
        createdAt:            firebase.firestore.FieldValue.serverTimestamp(),
        lastLoginAt:          firebase.firestore.FieldValue.serverTimestamp(),
        emailVerified:        false,
        registrationComplete: false
      }).catch(function (err) {
        console.warn("[auth.js] Firestore write failed:", err);
      });
    }

    // 4. Sign out immediately — user must verify email first
    await auth.signOut();

    console.log("[auth.js] User registered:", user.uid);
    return { success: true, user: user };
  }

  // -- Login -----------------------------------------------------------------

  /**
   * Sign the user in. Returns the Firebase user object on success, or null
   * if the email is not yet verified (a modal will be shown in that case).
   */
  async function handleLogin(email, password) {
    var auth = window.firebaseAuth;
    var db   = window.firebaseDb;

    if (!auth) throw new Error("Firebase not ready. Please refresh and try again.");

    var cred = await auth.signInWithEmailAndPassword(email, password)
      .catch(function (err) {
        throw new Error(mapAuthError(err.code, err.message));
      });
    var user = cred.user;

    // Block unverified users
    if (!user.emailVerified) {
      await auth.signOut();
      // Signal to main.js to show the "not verified" modal
      if (typeof window.onEmailNotVerified === "function") {
        window.onEmailNotVerified(email);
      }
      return null;
    }

    // Update last-login in Firestore (background)
    if (db) {
      db.collection("users").doc(user.uid).update({
        lastLoginAt:   firebase.firestore.FieldValue.serverTimestamp(),
        emailVerified: true
      }).catch(function (err) { console.warn("[auth.js] lastLogin update failed:", err); });
    }

    console.log("[auth.js] User logged in:", user.uid);
    return user;
  }

  // -- Verification status check ---------------------------------------------

  /**
   * Ask for the user's password (via modal), sign in temporarily, reload
   * the user object, and check emailVerified.
   */
  async function checkVerificationStatus(email) {
    toast("Checking verification status…", "info");

    var auth = window.firebaseAuth;
    if (!auth) { toast("Firebase not ready.", "error"); return; }

    var password = await new Promise(function (resolve) {
      window.modal.promptPassword(
        "Enter your password to check your email verification status.",
        resolve
      );
    });

    if (!password) {
      toast("Password is required.", "error");
      return;
    }

    try {
      var cred = await auth.signInWithEmailAndPassword(email, password);
      var user = cred.user;
      await user.reload();

      if (user.emailVerified) {
        toast("Email verified! Redirecting…", "success");
        if (typeof window.onEmailVerified === "function") {
          window.onEmailVerified(user);
        }
        setTimeout(function () { window.location.href = "landing.html"; }, 2500);
      } else {
        await auth.signOut();
        toast("Email not verified yet. Please check your inbox.", "error");
        if (typeof window.onEmailStillUnverified === "function") {
          window.onEmailStillUnverified(email);
        }
      }
    } catch (err) {
      toast(mapAuthError(err.code, "Failed to check verification status."), "error");
    }
  }

  // -- Resend verification email ---------------------------------------------

  async function resendVerificationEmail(email) {
    toast("Sending verification email…", "info");

    var auth = window.firebaseAuth;
    if (!auth) { toast("Firebase not ready.", "error"); return; }

    var password = await new Promise(function (resolve) {
      window.modal.promptPassword(
        "Enter your password to resend the verification email.",
        resolve
      );
    });

    if (!password) {
      toast("Password is required.", "error");
      return;
    }

    try {
      var cred = await auth.signInWithEmailAndPassword(email, password);
      var user = cred.user;

      if (user.emailVerified) {
        toast("Your email is already verified! Redirecting…", "success");
        setTimeout(function () { window.location.href = "landing.html"; }, 2000);
        return;
      }

      await user.sendEmailVerification();
      await auth.signOut();
      toast("Verification email sent! Please check your inbox.", "success");
      if (typeof window.onVerificationResent === "function") {
        window.onVerificationResent(email);
      }
    } catch (err) {
      toast(mapAuthError(err.code, "Failed to resend verification email."), "error");
    }
  }

  // -- Public API -------------------------------------------------------------
  window.auth = {
    handleSignup:             handleSignup,
    handleLogin:              handleLogin,
    checkVerificationStatus:  checkVerificationStatus,
    resendVerificationEmail:  resendVerificationEmail,
    mapAuthError:             mapAuthError
  };
})();
