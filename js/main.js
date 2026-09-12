/**
 * js/main.js
 * App bootstrap: wires up DOM, form validation, event listeners,
 * and coordinates between auth.js, modal.js, and ui-utils.js.
 *
 * Dependencies (all loaded before this file in the HTML):
 *  - js/firebase.js
 *  - js/ui-utils.js
 *  - js/modal.js
 *  - js/auth.js
 *
 * Contribution guide:
 *  - This file owns all DOM manipulation and event wiring.
 *  - Keep business logic in auth.js, UI utilities in ui-utils.js.
 *  - Set PAGE_MODE to "register" or "login" in the HTML before loading this script.
 */
(function () {
  "use strict";

  // -- Page mode -------------------------------------------------------------
  // Set window.PAGE_MODE = "login" | "register" before this script runs.
  // Falls back to "login" if not set.
  var PAGE_MODE = window.PAGE_MODE || "login";
  var isLoginMode = (PAGE_MODE === "login");

  // -- State -----------------------------------------------------------------
  var isLoading = false;
  var els = {};           // cached DOM elements
  var fieldErrorCache = new Map();

  // -- Validation helpers ----------------------------------------------------
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function debounce(fn, wait) {
    var timer;
    return function () {
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(null, args); }, wait);
    };
  }

  // -- Field-level error display ---------------------------------------------
  function showFieldError(field, message) {
    if (!field) return;
    field.classList.add("error");
    var helper = fieldErrorCache.get(field)
              || field.parentNode.querySelector(".helper-text");
    if (!fieldErrorCache.has(field)) fieldErrorCache.set(field, helper);
    if (helper) { helper.textContent = message; helper.classList.add("error"); }
  }

  function clearFieldError(field) {
    if (!field) return;
    field.classList.remove("error");
    var helper = fieldErrorCache.get(field)
              || field.parentNode.querySelector(".helper-text");
    if (!fieldErrorCache.has(field)) fieldErrorCache.set(field, helper);
    if (helper) {
      helper.classList.remove("error");
      if (field.id === "password") {
        helper.textContent = isLoginMode ? "Enter your password" : "At least 6 characters";
      }
    }
  }

  // -- Toast shortcut --------------------------------------------------------
  function toast(msg, type) {
    if (window.uiUtils && window.uiUtils.showToast) {
      window.uiUtils.showToast(msg, type || "info");
    }
  }

  // -- UI mode switch (login ? register) -------------------------------------
  function updateUI() {
    if (isLoginMode) {
      if (els.authTitle)     els.authTitle.textContent    = "Welcome Back";
      if (els.authSubtitle)  els.authSubtitle.textContent = "Sign in to continue your chemistry learning journey";
      if (els.nameGroup)     els.nameGroup.classList.add("hidden");
      if (els.btnText)       els.btnText.textContent      = "Sign In \u2192";
      if (els.toggleText)    els.toggleText.innerHTML     = "Don\u2019t have an account? <button type=\"button\" id=\"toggleMode\" class=\"toggle-link\">Create account</button>";
      if (els.passwordHelper) els.passwordHelper.textContent = "Enter your password";
      if (els.fullName) { els.fullName.removeAttribute("required"); }
    } else {
      if (els.authTitle)     els.authTitle.textContent    = "Create Your Account";
      if (els.authSubtitle)  els.authSubtitle.textContent = "Start your chemistry learning journey today";
      if (els.nameGroup)     els.nameGroup.classList.remove("hidden");
      if (els.btnText)       els.btnText.textContent      = "Create Account \u2192";
      if (els.toggleText)    els.toggleText.innerHTML     = "Already have an account? <button type=\"button\" id=\"toggleMode\" class=\"toggle-link\">Sign in here</button>";
      if (els.passwordHelper) els.passwordHelper.textContent = "At least 6 characters";
      if (els.fullName) { els.fullName.setAttribute("required", "required"); }
    }
    // Re-bind toggle button (it was rebuilt via innerHTML)
    var toggleBtn = document.getElementById("toggleMode");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        isLoginMode = !isLoginMode;
        updateUI();
        clearErrors();
      });
    }
    // Clear messages
    clearErrors();
  }

  function clearErrors() {
    if (els.email)    clearFieldError(els.email);
    if (els.password) clearFieldError(els.password);
    if (els.fullName) clearFieldError(els.fullName);
    if (els.messageContainer) els.messageContainer.innerHTML = "";
  }

  // -- Loading state ---------------------------------------------------------
  function setLoading(loading) {
    isLoading = loading;
    if (els.authBtn) els.authBtn.disabled = loading;
    if (els.btnText)        els.btnText.style.opacity       = loading ? "0" : "1";
    if (els.loadingSpinner) els.loadingSpinner.classList[loading ? "add" : "remove"]("show");
  }

  // -- Success modal helpers -------------------------------------------------
  function showSuccessModal(title, message, btnLabel, btnAction) {
    if (!els.successModal) return;
    if (els.modalTitle)   els.modalTitle.textContent = title;
    if (els.modalMessage) els.modalMessage.innerHTML = message;
    if (els.continueBtn) {
      els.continueBtn.textContent = btnLabel || "Continue";
      els.continueBtn.onclick = btnAction || function () {
        window.modal.hide("successModal");
        window.location.href = "landing.html";
      };
    }
    window.modal.show("successModal");
  }

  function showEmailVerificationModal(email, name) {
    showSuccessModal(
      "\uD83D\uDCE7 Verify Your Email",
      "<p>Hi " + name + "! \uD83D\uDC4B</p>" +
      "<p>A verification email has been sent to <strong>" + email + "</strong>.</p>" +
      "<p>Please check your inbox and click the link. Then click the button below.</p>" +
      "<p><small>Don\u2019t see it? Check your spam folder.</small></p>",
      "Check Verification Status",
      function () { window.auth.checkVerificationStatus(email); }
    );
  }

  function showEmailNotVerifiedModal(email) {
    showSuccessModal(
      "\u26A0\uFE0F Email Not Verified",
      "<p>Your email address has not been verified yet.</p>" +
      "<p><strong>" + email + "</strong></p>" +
      "<p>Click the link in the verification email, then click the button below.</p>" +
      "<p><small>Check your spam folder if you don\u2019t see it.</small></p>",
      "Check Verification Status",
      function () { window.auth.checkVerificationStatus(email); }
    );
  }

  // -- Form submission -------------------------------------------------------
  async function handleFormSubmit(e) {
    e.preventDefault();
    if (isLoading) return;

    var email    = (els.email    ? els.email.value.trim()    : "");
    var password = (els.password ? els.password.value         : "");
    var fullName = (els.fullName ? els.fullName.value.trim()  : "");

    clearErrors();

    var hasErrors = false;

    if (!validateEmail(email)) {
      showFieldError(els.email, "Please enter a valid email address.");
      hasErrors = true;
    }

    if (isLoginMode) {
      if (!password) { showFieldError(els.password, "Password is required."); hasErrors = true; }
    } else {
      if (password.length < 6) { showFieldError(els.password, "Password must be at least 6 characters."); hasErrors = true; }
      if (!fullName)            { showFieldError(els.fullName, "Please enter your full name."); hasErrors = true; }
    }

    if (hasErrors) return;

    if (!window.firebaseAuth) {
      toast("Firebase is not ready. Please refresh the page.", "error");
      return;
    }

    setLoading(true);

    try {
      if (isLoginMode) {
        var user = await window.auth.handleLogin(email, password);
        if (user) {
          // Verified login success
          showSuccessModal(
            "Welcome back, " + (user.displayName || "Student") + "! \uD83D\uDC4B",
            "You\u2019ve signed in successfully. Ready to continue your chemistry studies?",
            "Continue to ChemFlix",
            function () {
              window.modal.hide("successModal");
              window.location.href = "landing.html";
            }
          );
        }
        // If user is null, onEmailNotVerified callback handles the modal
      } else {
        var result = await window.auth.handleSignup(email, password, fullName);
        if (result && result.success) {
          showEmailVerificationModal(email, fullName || "Student");
        }
      }
    } catch (err) {
      toast(err.message || "An unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  }

  // -- DOM element cache -----------------------------------------------------
  function cacheElements() {
    els = {
      authForm:         document.getElementById("authForm"),
      authTitle:        document.getElementById("authTitle"),
      authSubtitle:     document.getElementById("authSubtitle"),
      email:            document.getElementById("email"),
      password:         document.getElementById("password"),
      fullName:         document.getElementById("fullName"),
      nameGroup:        document.getElementById("nameGroup"),
      passwordHelper:   document.getElementById("passwordHelper"),
      authBtn:          document.getElementById("authBtn"),
      btnText:          document.getElementById("btnText"),
      loadingSpinner:   document.getElementById("loadingSpinner"),
      toggleText:       document.getElementById("toggleText"),
      successModal:     document.getElementById("successModal"),
      modalTitle:       document.getElementById("modalTitle"),
      modalMessage:     document.getElementById("modalMessage"),
      continueBtn:      document.getElementById("continueBtn"),
      messageContainer: document.getElementById("messageContainer"),
      passwordToggle:   document.getElementById("passwordToggle"),
      modeToggle:       document.getElementById("modeToggle")
    };
  }

  // -- Event listeners -------------------------------------------------------
  function bindEvents() {
    if (els.authForm)  els.authForm.addEventListener("submit", handleFormSubmit);

    // Password visibility toggle
    if (els.passwordToggle && els.password) {
      els.passwordToggle.addEventListener("click", function () {
        var type = els.password.getAttribute("type") === "password" ? "text" : "password";
        els.password.setAttribute("type", type);
        els.passwordToggle.textContent = type === "password" ? "\uD83D\uDC41\uFE0F" : "\uD83D\uDE48";
      });
    }

    // Close modal on backdrop click
    if (els.successModal) {
      els.successModal.addEventListener("click", function (e) {
        if (e.target === els.successModal) window.modal.hide("successModal");
      });
    }

    // Continue button default action
    if (els.continueBtn) {
      els.continueBtn.addEventListener("click", function () {
        window.modal.hide("successModal");
        window.location.href = "landing.html";
      });
    }

    // Dark-mode toggle
    if (els.modeToggle) {
      els.modeToggle.addEventListener("click", function () {
        var isDark = document.body.classList.contains("dark-mode");
        window.uiUtils.applyTheme(!isDark);
        els.modeToggle.textContent = isDark ? "\uD83C\uDF19" : "\u2600\uFE0F";
      });
    }

    // Debounced real-time validation
    if (els.email)    els.email.addEventListener("input",    debounce(function () { if (els.email.classList.contains("error"))    clearFieldError(els.email);    }, 300));
    if (els.password) els.password.addEventListener("input", debounce(function () { if (els.password.classList.contains("error")) clearFieldError(els.password); }, 300));
    if (els.fullName) els.fullName.addEventListener("input", debounce(function () { if (els.fullName.classList.contains("error")) clearFieldError(els.fullName); }, 300));
  }

  // -- Auth-module callbacks -------------------------------------------------
  window.onEmailNotVerified = function (email) {
    showEmailNotVerifiedModal(email);
  };

  window.onEmailVerified = function (user) {
    showSuccessModal(
      "\uD83C\uDF89 Email Verified!",
      "<p>Welcome to ChemFlix! You now have full access.</p>",
      "Continue to ChemFlix",
      function () { window.location.href = "landing.html"; }
    );
  };

  window.onEmailStillUnverified = function (email) {
    showEmailNotVerifiedModal(email);
  };

  window.onVerificationResent = function (email) {
    if (els.modalMessage) {
      els.modalMessage.innerHTML = "<p>A new verification email was sent to <strong>" + email + "</strong>.</p><p><small>Check your spam folder if you don't see it.</small></p>";
    }
  };

  // -- Boot ------------------------------------------------------------------
  function boot() {
    cacheElements();

    var critical = ["authForm", "email", "password", "authBtn"];
    var missing = critical.filter(function (k) { return !els[k]; });
    if (missing.length) {
      console.error("[main.js] Missing critical elements:", missing);
      return;
    }

    // Apply stored theme
    var storedTheme = window.uiUtils ? window.uiUtils.getStoredTheme() : null;
    if (storedTheme) {
      window.uiUtils.applyTheme(storedTheme === "dark");
      if (els.modeToggle) els.modeToggle.textContent = storedTheme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19";
    }

    bindEvents();
    updateUI();
    console.log("[main.js] Chemflix ready. Mode:", isLoginMode ? "login" : "register");
  }

  // Wait for Firebase before booting
  window.onFirebaseReady = function () {
    console.log("[main.js] Firebase ready, booting app.");
    boot();
  };

  // If DOM is already ready and Firebase already loaded, boot immediately
  if (document.readyState !== "loading") {
    if (window.firebaseAuth) boot();
    // else wait for onFirebaseReady callback
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      if (window.firebaseAuth) boot();
    });
  }
})();
