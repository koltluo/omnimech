jQuery(document).ready(function($) {
    // Product Tabs Functionality
    function setupProductTabs() {
        const tabContainers = $('[data-tabs-container]');
        tabContainers.each(function() {
            const container = $(this);
            const tabTitles = container.find('.tab-title');
            const tabContents = container.find('.entry-tabs-content');
            // Hide all content panes initially except the first one
            tabContents.not(':first').hide();
            tabTitles.first().addClass('active'); // Ensure first tab is marked active
            tabTitles.on('click', function(e) {
                e.preventDefault();
                const $this = $(this);
                const targetId = $this.attr('aria-controls'); // Use aria-controls
                if (!$this.hasClass('active')) {
                    // Deactivate current tab and content
                    tabTitles.removeClass('active');
                    tabContents.hide().removeClass('entry-content-show'); // Hide and remove show class
                    // Activate new tab and content
                    $this.addClass('active');
                    $('#' + targetId).fadeIn().addClass('entry-content-show'); // Fade in and add show class
                }
            });
        });
    }
    setupProductTabs(); // Initialize tabs on page load
    // --- Add other JS from the original HTML ---
    // Example: Related Products Slider (if using Swiper as in original)
    // if ($('.cat-carousel-gallery-slider').length) {
    //     var swiper = new Swiper('.cat-carousel-gallery-slider', {
    //         slidesPerView: 4, // Adjust based on your grid setting
    //         spaceBetween: 30, // Adjust spacing
    //         slidesPerGroup: 4, // Adjust based on your grid setting
    //         loop: true,
    //         loopFillGroupWithBlank: true,
    //         pagination: {
    //             el: '.swiper-pagination',
    //             clickable: true,
    //         },
    //         navigation: {
    //             nextEl: '.swiper-button-next',
    //             prevEl: '.swiper-button-prev',
    //         },
    //          breakpoints: { // Example breakpoints
    //             1024: { slidesPerView: 4, slidesPerGroup: 4 },
    //             768: { slidesPerView: 3, slidesPerGroup: 3 },
    //             640: { slidesPerView: 2, slidesPerGroup: 2 },
    //             320: { slidesPerView: 1, slidesPerGroup: 1 }
    //          }
    //     });
    // }
     // Example: Fancybox Initialization (if used for images/videos)
    //  $('[data-fancybox]').fancybox({
    //      // Fancybox options
    //  });
     // Back to top button logic
     $(window).scroll(function() {
         if ($(this).scrollTop() > 100) {
             $('#back-top').fadeIn();
         } else {
             $('#back-top').fadeOut();
         }
     });
     $('#back-top a').click(function() {
         $('html, body').animate({scrollTop: 0}, 800);
         return false;
     });
     // Add other custom JS logic from the original file as needed...
});
