// Simple Theme Manager - Production Ready
let currentTheme = localStorage.getItem('chemflix_theme') || 'dark';

function applyTheme(theme) {
    const body = document.body;
    
    // Remove all theme classes
    body.classList.remove('dark-mode', 'light-mode');
    
    // Add the correct theme class
    body.classList.add(theme + '-mode');
    
    // Update button icon
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        modeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    // Save to localStorage
    localStorage.setItem('chemflix_theme', theme);
    currentTheme = theme;
}

function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// Initialize theme immediately
applyTheme(currentTheme);

// Setup event listener when DOM is ready
function setupToggle() {
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleTheme);
    }
}

// Try to setup immediately and when DOM is ready
setupToggle();
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupToggle);
}

// Make globally available
window.toggleTheme = toggleTheme;
window.applyTheme = applyTheme;