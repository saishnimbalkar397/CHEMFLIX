/**
 * js/firebase.js
 * Initialises Firebase once and exposes window.firebaseAuth and window.firebaseDb.
 *
 * Contribution guide:
 *  - Do NOT call firebase.initializeApp() anywhere else.
 *  - Access auth via window.firebaseAuth, Firestore via window.firebaseDb.
 */
(function () {
  "use strict";

  var FIREBASE_CONFIG = {
    apiKey: "AIzaSyAbDv3pxAcvVIQfEkS-uuPgU_bzR_J5r0U",
    authDomain: "chemflix-da008.firebaseapp.com",
    projectId: "chemflix-da008",
    storageBucket: "chemflix-da008.firebasestorage.app",
    messagingSenderId: "666681098738",
    appId: "1:666681098738:web:db0cc79d3e357cbb752b6b",
    measurementId: "G-Y3DP2NX6JT"
  };

  function initFirebase() {
    if (typeof firebase === "undefined") {
      console.error("[firebase.js] Firebase SDK not loaded yet.");
      return;
    }
    if (firebase.apps && firebase.apps.length > 0) {
      window.firebaseAuth = firebase.auth();
      window.firebaseDb   = firebase.firestore();
      console.log("[firebase.js] Firebase already initialised - reusing.");
      if (typeof window.onFirebaseReady === "function") window.onFirebaseReady();
      return;
    }
    try {
      firebase.initializeApp(FIREBASE_CONFIG);
      window.firebaseAuth = firebase.auth();
      window.firebaseDb   = firebase.firestore();
      console.log("[firebase.js] Firebase initialised successfully.");
      if (typeof window.onFirebaseReady === "function") window.onFirebaseReady();
    } catch (err) {
      console.error("[firebase.js] Initialisation error:", err);
    }
  }

  window.addEventListener("load", initFirebase);
  window.initFirebase = initFirebase;
})();
