
(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)',
			mobile:	'(max-width: 320px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

			skel.viewport({
				width: "device-width",
				scalable: true,
				breakpoints: {
					small: {
						scalable: false
					}
				}
			});
			
			skel.layout({
				reset: "full",
				conditionals: true,
				grid: true
			});
			
			// $(document).ready(function(){
			  // $(".owl-carousel").owlCarousel({
				  // items: 1,
				  // loop: true,
				  // smartSpeed: 1000,
				  // fluidSpeed: false,
				  // pullDrag: false,
				  // touchDrag: true
			  // });
			// });
			
			$(document).ready(function(){
			  $('.owl-carousel').slick({
				dots: true,
				arrows: false,
				infinite: false,
				speed: 700
			  });
			});
			
			$('.pop').scrollex({
			  enter: function() {

				// Set #foobar's background color to green when we scroll into it.
				  $(this).css('animation-name', 'pop-up');

			  }
			});
		
		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');
			if (skel.vars.mobile)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')
			&&	!skel.vars.mobile){

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

	});

})(jQuery);

