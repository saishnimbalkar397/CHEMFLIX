# ChemFlix QA / E2E Test Report

**Date:** 2026-09-12  
**Target:** `http://localhost:5500/`  
**Environment:** Local static server already running on port 5500; browser preview page reached `landing.html` after the root redirect.

## Summary

| Area | Passed | Failed / blocked |
|---|---:|---:|
| Page loading and local asset checks | 4 | 5 missing fallback references |
| Landing/unit navigation | 3 | 1 |
| Auth form interactions | 5 | 1 |
| Responsive/visual smoke checks | 2 | 1 limitation |
| Console/network smoke check | 1 | 0 |
| **Total** | **15** | **7** |

The browser preview rendered without horizontal overflow at its available `527x712` viewport (`scrollWidth=512`). The requested exact `1920x1080` and `375x812` viewport sizes were not available as browser-preview resize controls in this environment; mobile behavior was therefore smoke-tested at the narrower available viewport and additionally reviewed against the project's `480px`, `768px`, and `1024px` media-query breakpoints.

## Remediation status

All bugs listed below were fixed after the initial audit. Registration now opens directly in Register mode, logo fallbacks no longer request a missing JPG, landing navigation targets real sections/actions, and the Unit 3 quiz label no longer contains the stray `>` character. Quiz question-count messaging was also aligned to the supported 1–20 range.

## Functional test trace

1. Opened `/`; root redirected to `landing.html`. Landing content, unit cards, theme button, and logo rendered.
2. Opened `/chemflix-registration.html`; page loaded and all auth controls were present.
3. Clicked **Register** tab; form changed to `Create Your Account`, displayed the full-name field, and changed submit text to `Create Account`.
4. Submitted the empty registration form; required-field validation displayed for email and full name.
5. Entered `qa+test@example.com`, `p@ss<>&123`, and `QA <Tester> & Co`; password visibility toggle changed the password input from `password` to `text`.
6. Opened `/Hompage/chemflix unit1.html`; content, carousel controls, theme button, and **Attempt Quiz** were present.
7. Clicked **Attempt Quiz**; the flow did not remain on the quiz in the unauthenticated browser session. Direct quiz navigation was redirected to `/chemflix-registration.html`, which is consistent with the quiz auth guard but should be made explicit in the UX.
8. Clicked the theme button; `localStorage.chemflix_theme` changed to `light` and the body received `light-mode`.

## Discovered bugs

| # | Severity | Area / file | Steps to reproduce | Observed result | Console / network evidence |
|---:|---|---|---|---|---|
| 1 | **Major** | `chemflix-registration.html:182,226` | Open `/chemflix-registration.html` with a fresh session. | The page title and route are registration-oriented, but the initial UI is **Welcome Back / Sign In**; `PAGE_MODE` is set to `login` and the load handler calls `switchTab("login")`. Users must click Register before they can register. | No unhandled browser error observed. |
| 2 | **Minor** | `Hompage/chemflix homepage.html:14`; `Hompage/chemflix unit1.html:367`; `unit2.html:364`; `unit3.html:365`; `unit4.html:365` | Force `assets/chemfli-logo.png` to fail or remove it, then load a homepage/unit page. | The `onerror` fallback requests `../assets/chemflix-logo.jpg`, but that file does not exist. The fallback then hides the image, so branding can disappear instead of degrading to the text logo. | Static reference check reports five missing `chemflix-logo.jpg` references; primary PNG currently loads successfully. |
| 3 | **Minor** | `landing.html:29-32` | Click **About**, **Feedback**, **Contact us**, or **Our Team**. | Each link targets `#` and produces no content, navigation, or dialog. | No console error observed. |
| 4 | **Minor** | `Hompage/chemflix unit3.html:402` | Open Unit 3 and inspect/click **Attempt Quiz**. | Button label contains a visible leading `>` (`>Attempt Quiz`). | No console error observed. |

## Responsive / visual audit

| Check | Result |
|---|---|
| Narrow viewport smoke test | Passed at `527x712`; no horizontal document overflow was detected on landing, auth, or Unit 1 pages. |
| Desktop layout | Not directly resizeable in the integrated browser preview; CSS contains desktop defaults and breakpoints through `1024px`. |
| Mobile layout | Narrow smoke test passed; responsive rules exist at `480px`/`768px`. Exact `375x812` capture was unavailable. |
| Broken images / alt text | All images observed in-browser loaded and had non-empty `alt` text. Static fallback references described above are broken. |
| Screenshots | Captured during the audit for the landing page, registration page, Unit 1 page, and auth default-state/quiz redirect states in the integrated browser session. |

## Recommended fixes

1. Make `chemflix-registration.html` initialize with `window.PAGE_MODE = "register"` and call `switchTab("register")` on load, or redirect registration users to the Register tab before rendering.
2. Replace every `chemflix-logo.jpg` fallback with the existing `assets/chemfli-logo.png`/text fallback, or add the intended JPG asset and verify it loads.
3. Replace placeholder `#` navigation links with real sections/routes or implement the corresponding dialogs.
4. Remove the stray `>` from the Unit 3 quiz button label.
5. For the auth-gated quiz path, show an intentional “Sign in required” message before redirecting and preserve the requested quiz URL for return navigation.
