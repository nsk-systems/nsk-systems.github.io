/*
	Twenty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)'
	});
	
	skel.viewport({
		breakpoints: {
			mobile: {
				scalable: false
			}
		}
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on narrower.
			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly({
				speed: 1000,
				offset: -10
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				expandMode: (skel.vars.touch ? 'click' : 'hover')
			});

		// Off-Canvas Navigation.

			// Navigation Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navButton, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Header.
		// If the header is using "alt" styling and #banner is present, use scrollwatch
		// to revert it back to normal styling once the user scrolls past the banner.
		// Note: This is disabled on mobile devices.
			if (!skel.vars.mobile
			&&	$header.hasClass('alt')
			&&	$banner.length > 0) {

				$window.on('load', function() {

					$banner.scrollwatch({
						delay:		0,
						range:		1,
						anchor:		'top',
						on:			function() { $header.addClass('alt reveal'); },
						off:		function() { $header.removeClass('alt'); }
					});

				});

			}

	});
	
	$(document).ready(function() {
		$(".fancybox").fancybox({
			padding		: 0,
			autoSize : true,
			fitToView : true,
			beforeLoad : function() {         
				this.width  = parseInt(this.element.data('fancybox-width'));  
				this.height = parseInt(this.element.data('fancybox-height'));
				this.fitToView  = !(this.element.data('fancybox-fit') == false);
			},
			helpers: {
					title : {
						type : 'outside'
					},
					overlay : {
						speedOut : 0,
						showEarly : true
						}
					}
		});
	});
	
	// Forms validation
	$(".ajax-form-msg").validate({
		rules: {
			name: {
			required: true,
			minlength: 2
			},
			email: {
			required: true,
			email: true
			},
			message: {
			required: true,
			}
		},
		messages: {
			name: "Укажите Ваше имя",
			email: {
			  required: "Укажите Ваш e-mail",
			  email: "Формат: name@domain.com"
			},
			message: {
			  required: "Напишите нам что-нибудь"
			}
		},
		// errorPlacement: function(error, element) {
		// },
		submitHandler: function(form) {
			$.ajax({
				dataType: "jsonp",
				url: "http://getsimpleform.com/messages/ajax?form_api_token=f346c137e5a7ca4624adddbae2e9b3a4",
				data: $(".ajax-form-msg").serialize() 
				}).done(function() {
				//callback which can be used to show a thank you message
				//and reset the form
				$(".ajax-form-msg").hide();
				$(".form-thank-you-msg").fadeIn("400");
			});
			return false; //to stop the form from submitting
		}
	});
	
	$(".ajax-form-callback").validate({
		rules: {
			name: {
			required: true,
			minlength: 2
			},
			phone: {
			required: true
			}
		},
		messages: {
			name: "Укажите Ваше имя",
			phone: "Укажите Ваш телефон"
		},
		// errorPlacement: function(error, element) {
		// },
		submitHandler: function(form) {
			$.ajax({
				dataType: "jsonp",
				url: "http://getsimpleform.com/messages/ajax?form_api_token=f346c137e5a7ca4624adddbae2e9b3a4",
				data: $(".ajax-form-callback").serialize() 
				}).done(function() {
				//callback which can be used to show a thank you message
				//and reset the form
				$(".ajax-form-callback").hide();
				$(".form-thank-you-callback").fadeIn("400");
			});
			return false; //to stop the form from submitting
		}
	});

})(jQuery);