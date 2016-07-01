/* skel-baseline v3.0.1 | (c) n33 | skel.io | MIT licensed */

(function($) {

	"use strict";

	// Methods/polyfills.

		// addEventsListener
			var addEventsListener=function(o,t,e){var n,i=t.split(" ");for(n in i)o.addEventListener(i[n],e)}

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

	// Vars.
		var	$window = $(window),
			$body = document.querySelector('body'),
			$header = $('#header'),
			$banner = $('#banner-wrapper');

	// Breakpoints.
		skel.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});
		
	// Viewport	
		skel.viewport({
			breakpoints: {
				small: {
					scalable: false
				}
			}
		});

	// Disable animations/transitions until everything's loaded.
		$body.classList.add('is-loading');

		window.addEventListener('load', function() {
			$body.classList.remove('is-loading');
		});

	// Nav.
		var	$nav = document.querySelector('#nav'),
			$navToggle = document.querySelector('a[href="#nav"]'),
			$navClose;

		
		// Hide function
			var hideNav=function(){
				$nav.classList.remove('visible');
				$body.classList.remove('menu-visible');
			};
			
		// Event: Prevent clicks/taps inside the nav from bubbling.
			addEventsListener($nav, 'click touchend', function(event) {
				event.stopPropagation();
			});

		// Event: Hide nav on body click/tap.
			addEventsListener($body, 'click touchend', function(event) {
				hideNav();
			});
			
		// Toggle.

			// Event: Toggle nav on click.
				$navToggle.addEventListener('click', function(event) {

					event.preventDefault();
					event.stopPropagation();

					$nav.classList.toggle('visible');
					$body.classList.toggle('menu-visible');

				});

		// Close.

			// Create element.
				$navClose = document.createElement('a');
					$navClose.href = '#';
					$navClose.className = 'close';
					$navClose.tabIndex = 0;
					$nav.appendChild($navClose);

			// Event: Hide on ESC.
				window.addEventListener('keydown', function(event) {

					if (event.keyCode == 27)
						hideNav();

				});

			// Event: Hide nav on click.
				$navClose.addEventListener('click', function(event) {

					event.preventDefault();
					event.stopPropagation();

					hideNav();

				});
				
		// Close on link click GRN
		var
			$this = $('#nav');
			
		$this.on('click', 'a', function(event) {

			var $a = $(this),
				href = $a.attr('href'),
				target = $a.attr('target');

			// if (!href || href == '#' || href == '' || href == '#' + id)
				// return;

			// Cancel original event.
				event.preventDefault();
				event.stopPropagation();

			// Hide panel.
				hideNav();

			// Redirect to href.
				window.setTimeout(function() {

					if (target == '_blank')
						window.open(href);
					else
						window.location.href = href;

				}, 500);

		});
	// Header.
		if ($header.hasClass('alt')) {
			skel.on('+small', function() {
				$header.removeClass('alt');
				$banner.unscrollex();
			});
			skel.on('-small !small', function() {
				$header.addClass('alt');
				if (($banner.length > 0)
				&&	($header.hasClass('alt'))
				&&	(!skel.breakpoint('small').active)) {

					$window.on('resize', function() { $window.trigger('scroll'); });

					$banner.scrollex({
						bottom:		$header.outerHeight() + 1,
						terminate:	function() { $header.removeClass('alt'); },
						enter:		function() { $header.addClass('alt reveal'); },
						leave:		function() { $header.removeClass('alt'); }
					});

				}
			});
		};
				
		if (skel.vars.IEVersion < 9)
			$header.removeClass('alt');

	// Slick slider	
		$(document).ready(function(){
			  $('.slick').slick({
				dots: true,
				arrows: true,
				infinite: true,
				speed: 700
			  });
			});

})(jQuery);
