// Initialize Swiper
var swiper = new Swiper(".mySwiper", {
    // Enable touch/swipe
    touchEventsTarget: 'container',
    allowTouchMove: true,
    
    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    
    // Pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    
    // Enable keyboard control
    keyboard: {
        enabled: true,
    },
    
    // Enable mousewheel
    mousewheel: {
        enabled: true,
    },
});


