/**
 * js/ui-utils.js
 * Toast notification and general UI helper utilities.
 *
 * Contribution guide:
 *  - Use window.uiUtils.showToast(message, type) for user feedback.
 *  - Types: "success" | "error" | "info" | "warning"
 */
(function () {
  "use strict";

  // -- Toast container --------------------------------------------------------
  function getOrCreateToastContainer() {
    var el = document.getElementById("toast-container");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast-container";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      el.style.cssText = [
        "position:fixed",
        "bottom:1.5rem",
        "right:1.5rem",
        "z-index:9999",
        "display:flex",
        "flex-direction:column",
        "gap:0.5rem",
        "pointer-events:none"
      ].join(";");
      document.body.appendChild(el);
    }
    return el;
  }

  // -- Show a single toast ----------------------------------------------------
  function showToast(message, type, duration) {
    type     = type     || "info";
    duration = duration || 4000;

    var container = getOrCreateToastContainer();

    var colours = {
      success: { bg: "#10B981", text: "#fff" },
      error:   { bg: "#EF4444", text: "#fff" },
      warning: { bg: "#F59E0B", text: "#000" },
      info:    { bg: "#3B82F6", text: "#fff" }
    };
    var c = colours[type] || colours.info;

    var toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = [
      "background:" + c.bg,
      "color:" + c.text,
      "padding:0.75rem 1.25rem",
      "border-radius:8px",
      "font-size:0.9rem",
      "font-weight:500",
      "box-shadow:0 4px 16px rgba(0,0,0,0.3)",
      "pointer-events:auto",
      "opacity:0",
      "transform:translateY(10px)",
      "transition:opacity 0.25s ease, transform 0.25s ease",
      "max-width:320px",
      "word-wrap:break-word"
    ].join(";");

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
      });
    });

    // Auto dismiss
    setTimeout(function () {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration);
  }

  // -- Theme toggle helper ----------------------------------------------------
  function applyTheme(isDark) {
    var body = document.body;
    if (isDark) {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
    } else {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
    }
    try { localStorage.setItem("chemflix_theme", isDark ? "dark" : "light"); } catch (e) {}
  }

  function getStoredTheme() {
    try { return localStorage.getItem("chemflix_theme"); } catch (e) { return null; }
  }

  // -- Public API -------------------------------------------------------------
  window.uiUtils = {
    showToast:       showToast,
    applyTheme:      applyTheme,
    getStoredTheme:  getStoredTheme
  };
})();
