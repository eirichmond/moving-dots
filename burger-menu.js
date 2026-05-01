/**
 * Animated burger menu icon for WordPress block themes.
 *
 * Replaces the default navigation SVG with three animated spans that
 * morph into an X when the mobile menu is open, and back to three
 * horizontal lines when it closes.
 *
 * Enqueue in functions.php:
 *   wp_enqueue_script( 'burger-menu', get_stylesheet_directory_uri() . '/burger-menu.js', [], null, true );
 */
(function () {
    'use strict';

    function init() {
        document.querySelectorAll('.wp-block-navigation').forEach(function (nav) {
            var openBtn   = nav.querySelector('.wp-block-navigation__responsive-container-open');
            var container = nav.querySelector('.wp-block-navigation__responsive-container');

            if (!openBtn || !container) return;

            // Swap the default SVG for three individually-animatable spans
            var svg = openBtn.querySelector('svg');
            if (svg) svg.remove();

            var icon = document.createElement('span');
            icon.className = 'burger-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.innerHTML = '<span></span><span></span><span></span>';
            openBtn.appendChild(icon);

            // Mirror WordPress's is-menu-open state onto the button so CSS
            // can drive the burger → X transition without any JS animation.
            new MutationObserver(function () {
                var isOpen = container.classList.contains('is-menu-open');
                openBtn.classList.toggle('is-active', isOpen);
                openBtn.setAttribute('aria-expanded', String(isOpen));
            }).observe(container, { attributes: true, attributeFilter: ['class'] });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
