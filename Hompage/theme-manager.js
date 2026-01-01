// Universal Theme Manager for ChemFlix
// This script ensures consistent theme across all pages

(function() {
    'use strict';
    
    console.log('🎨 Universal Theme Manager loaded');
    
    // Initialize theme immediately to prevent flash
    function initializeTheme() {
        const savedTheme = localStorage.getItem('chemflix_theme') || 'dark';
        const body = document.body;
        
        console.log('🎨 Applying saved theme:', savedTheme);
        
        // Apply theme class
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        }
        
        // Update mode toggle button if it exists
        updateModeToggle(savedTheme);
    }
    
    // Update mode toggle button
    function updateModeToggle(theme) {
        const modeToggle = document.getElementById('modeToggle');
        
        if (modeToggle) {
            const newIcon = theme === 'dark' ? '☀️' : '🌙';
            modeToggle.textContent = newIcon;
            console.log('🎨 Updated toggle button to:', newIcon);
        }
    }
    
    // Toggle theme function
    function toggleTheme() {
        console.log('🎨 Toggle theme clicked!');
        
        const body = document.body;
        const isDark = body.classList.contains('dark-mode');
        const newTheme = isDark ? 'light' : 'dark';
        
        console.log('🎨 Switching to:', newTheme);
        
        // Update classes
        if (newTheme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        }
        
        // Save to localStorage
        localStorage.setItem('chemflix_theme', newTheme);
        
        // Update toggle button
        updateModeToggle(newTheme);
        
        console.log('🎨 Theme toggled successfully to:', newTheme);
    }
    
    // Setup event listeners when DOM is ready
    function setupEventListeners() {
        const modeToggle = document.getElementById('modeToggle');
        
        if (modeToggle) {
            // Remove existing listeners to prevent duplicates
            modeToggle.removeEventListener('click', toggleTheme);
            modeToggle.addEventListener('click', toggleTheme);
            console.log('🎨 Theme toggle event listener added successfully!');
        } else {
            console.warn('🎨 Mode toggle button not found');
        }
    }
    
    // Initialize immediately
    initializeTheme();
    
    // Setup event listeners when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupEventListeners);
    } else {
        setupEventListeners();
    }
    
    // Also try after a short delay to ensure elements are loaded
    setTimeout(setupEventListeners, 100);
    
    // Make functions globally available if needed
    window.ChemflixTheme = {
        toggle: toggleTheme,
        init: initializeTheme,
        getCurrentTheme: () => localStorage.getItem('chemflix_theme') || 'dark'
    };
    
})();