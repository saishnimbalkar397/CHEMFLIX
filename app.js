// Application state
let isLoginMode = false;
let isLoading = false;


let elements = {};

function initializeElements() {
    elements = {
        authForm: document.getElementById('authForm'),
        authTitle: document.getElementById('authTitle'),
        authSubtitle: document.getElementById('authSubtitle'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        fullName: document.getElementById('fullName'),
        nameGroup: document.getElementById('nameGroup'),
        passwordHelper: document.getElementById('passwordHelper'),
        authBtn: document.getElementById('authBtn'),
        btnText: document.getElementById('btnText'),
        loadingSpinner: document.getElementById('loadingSpinner'),
        toggleText: document.getElementById('toggleText'),
        toggleMode: document.getElementById('toggleMode'),
        successModal: document.getElementById('successModal'),
        modalTitle: document.getElementById('modalTitle'),
        modalMessage: document.getElementById('modalMessage'),
        continueBtn: document.getElementById('continueBtn'),
        messageContainer: document.getElementById('messageContainer')
    };
}

// Optimized form validation with debouncing
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Cached DOM queries for better performance - with null checks
const fieldErrorCache = new Map();

function showFieldError(field, message) {
    if (!field) return;
    
    field.classList.add('error');
    let helperText = fieldErrorCache.get(field);
    if (!helperText) {
        helperText = field.parentNode.querySelector('.helper-text');
        fieldErrorCache.set(field, helperText);
    }
    if (helperText) {
        helperText.textContent = message;
        helperText.classList.add('error');
    }
}

function clearFieldError(field) {
    if (!field) return;
    
    field.classList.remove('error');
    let helperText = fieldErrorCache.get(field);
    if (!helperText) {
        helperText = field.parentNode.querySelector('.helper-text');
        fieldErrorCache.set(field, helperText);
    }
    if (helperText) {
        helperText.classList.remove('error');
        // Restore original helper text
        if (field.id === 'password') {
            helperText.textContent = isLoginMode ? 'Enter your password' : 'At least 6 characters';
        }
    }
}

function showMessage(message, type = 'error') {
    if (!elements.messageContainer) {
        console.error('Message container not found');
        alert(message); // Fallback to alert
        return;
    }
    
    // Remove existing messages
    elements.messageContainer.innerHTML = '';
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = message;
    
    elements.messageContainer.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Mode switching
function toggleMode() {
    isLoginMode = !isLoginMode;
    updateUI();
}

function updateUI() {
    if (isLoginMode) {
        // Login mode
        if (elements.authTitle) elements.authTitle.textContent = 'Welcome Back';
        if (elements.authSubtitle) elements.authSubtitle.textContent = 'Sign in to continue your chemistry learning journey';
        if (elements.nameGroup) elements.nameGroup.classList.add('hidden');
        if (elements.btnText) elements.btnText.textContent = 'Sign In';
        if (elements.toggleText) elements.toggleText.textContent = 'Don\'t have an account?';
        if (elements.toggleMode) elements.toggleMode.textContent = 'Create account';
        if (elements.passwordHelper) elements.passwordHelper.textContent = 'Enter your password';
        
        // Remove required attribute from full name field when hidden
        if (elements.fullName) {
            elements.fullName.removeAttribute('required');
        }
    } else {
        // Signup mode
        if (elements.authTitle) elements.authTitle.textContent = 'Create Your Account';
        if (elements.authSubtitle) elements.authSubtitle.textContent = 'Start your chemistry learning journey today';
        if (elements.nameGroup) elements.nameGroup.classList.remove('hidden');
        if (elements.btnText) elements.btnText.textContent = 'Create Account';
        if (elements.toggleText) elements.toggleText.textContent = 'Already have an account?';
        if (elements.toggleMode) elements.toggleMode.textContent = 'Sign in here';
        if (elements.passwordHelper) elements.passwordHelper.textContent = 'At least 6 characters';
        
        // Add required attribute to full name field when visible
        if (elements.fullName) {
            elements.fullName.setAttribute('required', 'required');
        }
    }
    
    // Clear any existing messages and errors
    if (elements.messageContainer) elements.messageContainer.innerHTML = '';
    if (elements.email) clearFieldError(elements.email);
    if (elements.password) clearFieldError(elements.password);
    if (elements.fullName) clearFieldError(elements.fullName);
}

// Loading state management - with null checks
function setLoading(loading) {
    isLoading = loading;
    
    if (elements.authBtn) {
        elements.authBtn.disabled = loading;
    }
    
    if (loading) {
        if (elements.btnText) elements.btnText.style.opacity = '0';
        if (elements.loadingSpinner) elements.loadingSpinner.classList.add('show');
    } else {
        if (elements.btnText) elements.btnText.style.opacity = '1';
        if (elements.loadingSpinner) elements.loadingSpinner.classList.remove('show');
    }
}

// Success modal
function showSuccessModal(title, message) {
    elements.modalTitle.textContent = title;
    elements.modalMessage.textContent = message;
    elements.successModal.classList.add('show');
}

function hideSuccessModal() {
    elements.successModal.classList.remove('show');
}

// Email Verification Modal Functions
function showEmailVerificationModal(email, name) {
    elements.modalTitle.textContent = `📧 Verify Your Email`;
    elements.modalMessage.innerHTML = `
        <p>Hi ${name}! 👋</p>
        <p>We've sent a verification email to:</p>
        <p><strong>${email}</strong></p>
        <p>Please check your inbox and click the verification link. After verification, click "Check Verification Status" below.</p>
        <p><small>Don't see the email? Check your spam folder. It may take a few minutes to arrive.</small></p>
    `;
    
    // Change button to check verification status instead of resend
    elements.continueBtn.textContent = 'Check Verification Status';
    elements.continueBtn.onclick = () => checkVerificationStatus(email);
    
    elements.successModal.classList.add('show');
}

function showEmailNotVerifiedModal(email) {
    elements.modalTitle.textContent = `⚠️ Email Not Verified`;
    elements.modalMessage.innerHTML = `
        <p>Your email address has not been verified yet.</p>
        <p><strong>${email}</strong></p>
        <p>Please check your inbox and click the verification link. After verification, click "Check Verification Status" below.</p>
        <p><small>Don't see the email? Check your spam folder or try registering again with the same email.</small></p>
    `;
    
    // Change button to check verification status
    elements.continueBtn.textContent = 'Check Verification Status';
    elements.continueBtn.onclick = () => checkVerificationStatus(email);
    
    elements.successModal.classList.add('show');
}

// New function to check verification status
async function checkVerificationStatus(email) {
    try {
        showMessage('Checking verification status...', 'info');
        
        const auth = window.firebaseAuth;
        
        // Get password to check status
        const password = prompt('Please enter your password to check verification status:');
        if (!password) {
            showMessage('Password required to check verification status.', 'error');
            return;
        }
        
        console.log('Checking verification status for:', email);
        
        // Sign in to check current verification status
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Reload user to get latest verification status
        await user.reload();
        
        console.log('Current verification status:', user.emailVerified);
        
        if (user.emailVerified) {
            // Email is verified! 
            showMessage('✅ Email verified successfully! Redirecting to ChemFlix...', 'success');
            
            // Update modal
            elements.modalMessage.innerHTML = `
                <p>🎉 <strong>Email Verified Successfully!</strong></p>
                <p>Welcome to ChemFlix! You now have full access to all features.</p>
            `;
            
            elements.continueBtn.textContent = 'Continue to ChemFlix';
            elements.continueBtn.onclick = () => {
                window.location.href = 'Hompage/chemflix homepage.html';
            };
            
            // Auto-redirect after 3 seconds
            setTimeout(() => {
                window.location.href = 'Hompage/chemflix homepage.html';
            }, 3000);
            
        } else {
            // Still not verified
            await auth.signOut();
            showMessage('Email not verified yet. Please check your inbox and click the verification link.', 'error');
            
            elements.modalMessage.innerHTML = `
                <p>❌ <strong>Email Not Verified Yet</strong></p>
                <p>Please check your inbox for: <strong>${email}</strong></p>
                <p>Click the verification link in the email, then try again.</p>
                <p><small>Check your spam folder if you don't see the email.</small></p>
            `;
        }
        
    } catch (error) {
        console.error('Error checking verification status:', error);
        
        let errorMessage = 'Failed to check verification status.';
        
        if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/user-not-found') {
            errorMessage = 'Account not found. Please register first.';
        } else if (error.code === 'auth/too-many-requests') {
            errorMessage = 'Too many attempts. Please try again later.';
        }
        
        showMessage(errorMessage, 'error');
    }
}

async function resendVerificationEmail(email) {
    try {
        console.log('Resending verification email for:', email);
        showMessage('Sending verification email...', 'info');
        
        const auth = window.firebaseAuth;
        
        // Try to sign in the user temporarily to resend verification
        const password = prompt('Please enter your password to resend verification email:');
        if (!password) {
            showMessage('Password required to resend verification email.', 'error');
            return;
        }
        
        console.log('Attempting to sign in user for resend...');
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        console.log('User signed in successfully:', user.uid);
        console.log('Email verified status:', user.emailVerified);
        
        if (user.emailVerified) {
            console.log('Email already verified');
            showMessage('Your email is already verified! You can now access ChemFlix.', 'success');
            setTimeout(() => {
                window.location.href = 'Hompage/chemflix homepage.html';
            }, 2000);
            return;
        }
        
        // Send verification email without continue URL
        console.log('Sending verification email...');
        await user.sendEmailVerification();
        console.log('Verification email sent successfully');
        
        // Sign out user again
        await auth.signOut();
        console.log('User signed out after sending email');
        
        showMessage('Verification email sent successfully! Please check your inbox.', 'success');
        
        // Update modal
        elements.modalMessage.innerHTML = `
            <p>✅ New verification email sent to:</p>
            <p><strong>${email}</strong></p>
            <p>Please check your inbox (including spam folder) and click the verification link.</p>
            <p><small>It may take a few minutes to arrive.</small></p>
        `;
        
        elements.continueBtn.textContent = 'OK, Got It';
        elements.continueBtn.onclick = () => {
            hideSuccessModal();
            // Reset the continue button
            elements.continueBtn.textContent = 'Continue to ChemFlix';
            elements.continueBtn.onclick = () => {
                window.location.href = 'Hompage/chemflix homepage.html';
            };
        };
        
    } catch (error) {
        console.error('Error resending verification email:', error);
        console.error('Error details:', {
            code: error.code,
            message: error.message
        });
        
        let errorMessage = 'Failed to resend verification email.';
        
        if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/user-not-found') {
            errorMessage = 'Account not found. Please register first.';
        } else if (error.code === 'auth/too-many-requests') {
            errorMessage = 'Too many attempts. Please try again later.';
        } else if (error.code === 'auth/network-request-failed') {
            errorMessage = 'Network error. Please check your connection.';
        } else {
            errorMessage = `Error: ${error.message}`;
        }
        
        showMessage(errorMessage, 'error');
    }
}

// Optimized Firebase Authentication Functions - With Email Verification
async function handleSignup(email, password, fullName) {
    try {
        const auth = window.firebaseAuth;
        const db = window.firebaseDb;
        
        // Create user account
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Prepare operations to run in parallel for speed
        const operations = [];
        
        // Add profile update if name provided
        if (fullName.trim()) {
            operations.push(
                user.updateProfile({ displayName: fullName.trim() })
            );
        }
        
        // Send email verification without continue URL to avoid domain issues
        console.log('Sending verification email to:', email);
        operations.push(
            user.sendEmailVerification().then(() => {
                console.log('Verification email sent successfully to:', email);
            }).catch((error) => {
                console.error('Failed to send verification email:', error);
                throw error;
            })
        );
        
        // Add user data to Firestore (non-blocking for faster UX)
        const userData = {
            email: email,
            displayName: fullName.trim() || null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
            emailVerified: false, // Will be updated when user verifies
            registrationComplete: false
        };
        
        // Run Firestore write in background (don't wait for it)
        db.collection('users').doc(user.uid).set(userData).catch(err => {
            console.warn('Failed to save user data to Firestore:', err);
        });
        
        // Wait for profile update and email verification to be sent
        if (operations.length > 0) {
            await Promise.all(operations);
        }
        
        // Sign out user immediately after registration - they must verify email first
        await auth.signOut();
        
        console.log('User registered successfully, verification email sent:', user.uid);
        
        // Show email verification modal instead of success modal
        showEmailVerificationModal(email, fullName.trim() || 'Student');
        
        return { success: true, user: user };
        
    } catch (error) {
        console.error('Signup error:', error);
        
        // Enhanced error handling
        let errorMessage = 'Registration failed. Please try again.';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already registered. Please sign in instead.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email registration is not enabled. Please contact support.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak. Please choose a stronger password.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your connection and try again.';
                break;
        }
        
        throw new Error(errorMessage);
    }
}

async function handleLogin(email, password) {
    try {
        const auth = window.firebaseAuth;
        const db = window.firebaseDb;
        
        // Sign in user
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Check if email is verified
        if (!user.emailVerified) {
            // Sign out the user immediately
            await auth.signOut();
            
            // Show email verification required modal
            showEmailNotVerifiedModal(email);
            return null;
        }
        
        // Update last login time in background (don't wait)
        db.collection('users').doc(user.uid).update({
            lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
            emailVerified: true
        }).catch(err => console.warn('Failed to update last login:', err));
        
        console.log('User logged in successfully:', user.uid);
        
        // Show success modal immediately
        showSuccessModal(
            `Welcome back, ${user.displayName || 'Student'}! 👋`,
            'You\'ve successfully signed in. Ready to continue your chemistry studies?'
        );
        
        return user;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Form submission handler - Production Ready
async function handleFormSubmit(event) {
    event.preventDefault();
    
    if (isLoading) return;
    
    // Check if elements exist
    if (!elements.email || !elements.password) {
        showMessage('Form initialization error. Please refresh the page.', 'error');
        return;
    }
    
    const email = elements.email.value.trim();
    const password = elements.password.value;
    const fullName = elements.fullName ? elements.fullName.value.trim() : '';
    
    // Clear previous errors
    if (elements.email) clearFieldError(elements.email);
    if (elements.password) clearFieldError(elements.password);
    if (elements.messageContainer) elements.messageContainer.innerHTML = '';
    
    // Validate inputs
    let hasErrors = false;
    
    // Email validation
    if (!validateEmail(email)) {
        showFieldError(elements.email, 'Please enter a valid email address');
        hasErrors = true;
    }
    
    // Password validation
    if (isLoginMode) {
        // For login, just check if password exists
        if (password.length === 0) {
            showFieldError(elements.password, 'Password is required');
            hasErrors = true;
        }
    } else {
        // For signup, check minimum length
        if (password.length < 6) {
            showFieldError(elements.password, 'Password must be at least 6 characters');
            hasErrors = true;
        }
    }
    
    // Full name validation for signup
    if (!isLoginMode && !fullName.trim()) {
        if (elements.fullName) {
            showFieldError(elements.fullName, 'Please enter your full name');
        }
        hasErrors = true;
    }
    
    if (hasErrors) {
        return;
    }
    
    // Check Firebase availability
    if (!window.firebaseAuth) {
        showMessage('Firebase not initialized. Please refresh the page and try again.', 'error');
        return;
    }
    
    setLoading(true);
    
    try {
        if (isLoginMode) {
            const result = await handleLogin(email, password);
        } else {
            const result = await handleSignup(email, password, fullName);
        }
    } catch (error) {
        let errorMessage = 'An unexpected error occurred. Please try again.';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already registered. Try signing in instead.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email. Please create an account first.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password. Please try again.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password should be at least 6 characters long.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many failed attempts. Please try again later.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your connection and try again.';
                break;
            case 'auth/invalid-credential':
                errorMessage = 'Invalid login credentials. Please check your email and password.';
                break;
            default:
                errorMessage = `Error: ${error.message || 'Unknown error occurred'}`;
        }
        
        showMessage(errorMessage, 'error');
    } finally {
        setLoading(false);
    }
}

// Redirect to homepage
function redirectToHomepage() {
    // Store user info for homepage
    const user = window.firebaseAuth.currentUser;
    if (user) {
        // Force refresh the user to get updated profile
        user.reload().then(() => {
            const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                emailVerified: user.emailVerified
            };
            
            console.log('Storing user data for homepage:', userData);
            localStorage.setItem('chemflix_user', JSON.stringify(userData));
            
            // Redirect to homepage
            window.location.href = 'Hompage/chemflix homepage.html';
        }).catch((error) => {
            console.error('Error refreshing user:', error);
            // Fallback: store what we have
            localStorage.setItem('chemflix_user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                emailVerified: user.emailVerified
            }));
            window.location.href = 'Hompage/chemflix homepage.html';
        });
    } else {
        console.error('No current user found');
        window.location.href = 'Hompage/chemflix homepage.html';
    }
}

// Optimized event listeners with better error handling
function initializeEventListeners() {
    // Check if elements exist before adding listeners
    if (elements.authForm) {
        elements.authForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (elements.toggleMode) {
        elements.toggleMode.addEventListener('click', toggleMode);
    }
    
    if (elements.continueBtn) {
        elements.continueBtn.addEventListener('click', () => {
            hideSuccessModal();
            redirectToHomepage();
        });
    }
    
    // Close modal when clicking outside
    if (elements.successModal) {
        elements.successModal.addEventListener('click', (e) => {
            if (e.target === elements.successModal) {
                hideSuccessModal();
            }
        });
    }
    
    // Debounced real-time validation for better performance
    const debouncedEmailValidation = debounce(() => {
        if (elements.email && elements.email.classList.contains('error')) {
            clearFieldError(elements.email);
        }
    }, 300);
    
    const debouncedPasswordValidation = debounce(() => {
        if (elements.password && elements.password.classList.contains('error')) {
            clearFieldError(elements.password);
        }
    }, 300);
    
    const debouncedNameValidation = debounce(() => {
        if (elements.fullName && elements.fullName.classList.contains('error')) {
            clearFieldError(elements.fullName);
        }
    }, 300);
    
    if (elements.email) {
        elements.email.addEventListener('input', debouncedEmailValidation);
    }
    
    if (elements.password) {
        elements.password.addEventListener('input', debouncedPasswordValidation);
    }
    
    if (elements.fullName) {
        elements.fullName.addEventListener('input', debouncedNameValidation);
    }
}

// Check if user is already logged in
function checkAuthState() {
    if (window.firebaseAuth) {
        window.firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                console.log('User already logged in:', user.uid);
                // Optionally redirect to homepage if user is already logged in
                // redirectToHomepage();
            }
        });
    }
}

// Initialize application - Fixed and optimized with better debugging
function initializeApp() {
    console.log('Chemflix Registration System Initialized');
    
    // Initialize DOM elements first
    initializeElements();
    
    // Check if critical elements exist
    const criticalElements = ['authForm', 'email', 'password', 'authBtn'];
    const missingElements = criticalElements.filter(key => !elements[key]);
    
    if (missingElements.length > 0) {
        console.error('Critical elements missing:', missingElements);
        alert('Page not loaded properly. Please refresh the page.');
        return;
    }
    
    // Use requestAnimationFrame for smooth UI updates
    requestAnimationFrame(() => {
        initializeEventListeners();
        updateUI();
    });
    
    // Test Firebase availability
    console.log('Firebase availability:', {
        firebase: typeof firebase !== 'undefined',
        firebaseAuth: !!window.firebaseAuth,
        firebaseDb: !!window.firebaseDb
    });
    
    // Defer auth state check until Firebase is ready
    if (window.firebaseAuth) {
        checkAuthState();
    } else {
        console.log('Waiting for Firebase to initialize...');
        // Wait for Firebase to be available with shorter intervals
        const checkFirebase = setInterval(() => {
            if (window.firebaseAuth) {
                console.log('Firebase is now available');
                clearInterval(checkFirebase);
                checkAuthState();
            }
        }, 50); // Check every 50ms instead of 100ms
        
        // Stop checking after 5 seconds instead of 10
        setTimeout(() => {
            clearInterval(checkFirebase);
            if (!window.firebaseAuth) {
                console.error('Firebase failed to initialize within 5 seconds');
                showMessage('Firebase initialization failed. Please refresh the page.', 'error');
            }
        }, 5000);
    }
}

// Optimized DOM ready handler
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // If Firebase is already loaded, initialize immediately
        if (typeof firebase !== 'undefined') {
            initializeApp();
        } else {
            // Otherwise, wait for Firebase to load
            window.initializeApp = initializeApp;
        }
    });
} else {
    // DOM is already ready
    if (typeof firebase !== 'undefined') {
        initializeApp();
    } else {
        window.initializeApp = initializeApp;
    }

}
