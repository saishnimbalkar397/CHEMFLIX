/**
 * js/modal.js
 * Modal creation, focus-trap, and generic show/hide helpers.
 *
 * Contribution guide:
 *  - Use window.modal.show(id) / window.modal.hide(id) from any module.
 *  - Use window.modal.promptPassword(callback) instead of prompt().
 */
(function () {
  "use strict";

  // -- Generic show / hide ---------------------------------------------------
  function show(modalId) {
    var el = document.getElementById(modalId);
    if (el) {
      el.classList.add("show");
      el.style.display = "flex";
      // Trap focus inside modal
      var firstFocusable = el.querySelector("button, input, [tabindex]");
      if (firstFocusable) firstFocusable.focus();
    }
  }

  function hide(modalId) {
    var el = document.getElementById(modalId);
    if (el) {
      el.classList.remove("show");
      el.style.display = "none";
    }
  }

  // -- Password prompt modal -------------------------------------------------
  function ensurePasswordModal() {
    if (document.getElementById("cfx-password-modal")) return;
    var html = [
      '<div id="cfx-password-modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="cfx-pw-title" style="display:none;">',
      '  <div class="modal-content">',
      '    <div class="modal-header"><h3 id="cfx-pw-title">Enter Password</h3></div>',
      '    <div class="modal-body">',
      '      <p id="cfx-pw-desc" style="color:#B0B0B0;margin-bottom:1rem;">Please enter your password to continue.</p>',
      '      <div class="password-input-wrapper">',
      '        <input type="password" id="cfx-pw-input" class="form-group input" placeholder="Password" autocomplete="current-password" aria-describedby="cfx-pw-desc"/>',
      '      </div>',
      '    </div>',
      '    <div class="modal-actions" style="margin-top:1.25rem;display:flex;gap:0.75rem;justify-content:flex-end;">',
      '      <button id="cfx-pw-cancel" class="btn-secondary">Cancel</button>',
      '      <button id="cfx-pw-confirm" class="btn-primary">Confirm</button>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join("");
    document.body.insertAdjacentHTML("beforeend", html);

    var modal   = document.getElementById("cfx-password-modal");
    var input   = document.getElementById("cfx-pw-input");
    var confirm = document.getElementById("cfx-pw-confirm");
    var cancel  = document.getElementById("cfx-pw-cancel");

    function resolve(value) {
      hide("cfx-password-modal");
      input.value = "";
      if (typeof window._cfxPwCallback === "function") {
        var cb = window._cfxPwCallback;
        window._cfxPwCallback = null;
        cb(value);
      }
    }

    confirm.addEventListener("click", function () { resolve(input.value.trim()); });
    cancel.addEventListener("click",  function () { resolve(null); });

    // Allow Enter key to confirm
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); resolve(input.value.trim()); }
    });
  }

  /**
   * Show the password modal and invoke `callback(password)` when done.
   * If the user cancels, callback receives null.
   */
  function promptPassword(description, callback) {
    ensurePasswordModal();
    var desc = document.getElementById("cfx-pw-desc");
    if (desc && description) desc.textContent = description;
    window._cfxPwCallback = callback;
    show("cfx-password-modal");
    var input = document.getElementById("cfx-pw-input");
    if (input) { input.value = ""; input.focus(); }
  }

  // -- Public API -------------------------------------------------------------
  window.modal = {
    show:           show,
    hide:           hide,
    promptPassword: promptPassword
  };
})();
