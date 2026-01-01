
// Email verification and user avatar update
console.log('ChemFlix Homepage loading...');

// Check if user is authenticated and email is verified
function checkEmailVerification() {
    // Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
        console.log('Firebase not loaded yet, retrying...');
        setTimeout(checkEmailVerification, 1000);
        return;
    }
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('User is signed in:', user.uid);
            console.log('Email verified:', user.emailVerified);
            
            if (!user.emailVerified) {
                // Redirect to registration page with message
                alert('Please verify your email before accessing ChemFlix content. Check your inbox for the verification link.');
                window.location.href = '../chemflix-registration.html';
                return;
            }
            
            // User is verified, update avatar
            updateUserAvatar(user);
            
            // Check if user just verified their email (from URL parameters)
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('mode') === 'verifyEmail' || window.location.href.includes('apiKey=')) {
                // User just verified their email, show welcome message
                showVerificationSuccessMessage(user);
                // Clean up URL
                window.history.replaceState({}, document.title, window.location.pathname);
            }
            
        } else {
            // Check for test user in localStorage
            const testUser = localStorage.getItem('chemflix_user');
            if (testUser) {
                try {
                    const userData = JSON.parse(testUser);
                    if (userData.emailVerified) {
                        console.log('Test user found, allowing access');
                        updateUserAvatar(userData);
                        return;
                    }
                } catch (error) {
                    console.error('Error parsing test user data:', error);
                }
            }
            
            console.log('No user signed in, redirecting to registration...');
            window.location.href = '../chemflix-registration.html';
        }
    });
}

// Show verification success message
function showVerificationSuccessMessage(user) {
    // Create a temporary success banner
    const banner = document.createElement('div');
    banner.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        font-weight: 600;
        text-align: center;
        animation: slideDown 0.5s ease-out;
    `;
    
    banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">✅</span>
            <span>Email verified successfully! Welcome to ChemFlix, ${user.displayName || 'Student'}!</span>
        </div>
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(banner);
    
    // Remove banner after 5 seconds
    setTimeout(() => {
        banner.style.animation = 'slideDown 0.5s ease-out reverse';
        setTimeout(() => {
            if (banner.parentNode) {
                banner.parentNode.removeChild(banner);
            }
        }, 500);
    }, 5000);
}

// Function to update avatar
function updateUserAvatar(user) {
    console.log('Updating user avatar...');
    const userAvatar = document.getElementById('userAvatar');
    
    if (!userAvatar) {
        console.log('Avatar element not found');
        return;
    }
    
    // Use Firebase user data directly
    if (user && user.displayName && user.displayName.trim()) {
        const initial = user.displayName.trim().charAt(0).toUpperCase();
        console.log('Setting avatar to:', initial);
        userAvatar.textContent = initial;
        console.log('Avatar updated successfully');
    } else if (user && user.email && user.email.trim()) {
        const initial = user.email.trim().charAt(0).toUpperCase();
        console.log('Using email initial:', initial);
        userAvatar.textContent = initial;
    }
    
    // Also update localStorage for backup
    const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
    };
    localStorage.setItem('chemflix_user', JSON.stringify(userData));
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking email verification...');
    checkEmailVerification();
});

// Also try when window loads
window.addEventListener('load', function() {
    console.log('Window loaded, checking email verification...');
    checkEmailVerification();
});

setTimeout(function() {
    console.log('Delayed update...');
    updateUserAvatar();
}, 500);

setTimeout(function() {
    console.log('Second delayed update...');
    updateUserAvatar();
}, 2000);

// Navigation highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Initialize Lenis smooth scrolling
const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);




