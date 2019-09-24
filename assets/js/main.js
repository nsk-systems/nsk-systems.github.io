(function($) {

	"use strict";

	// Methods/polyfills.

		// addEventsListener
			var addEventsListener=function(o,t,e){var n,i=t.split(" ");for(n in i)o.addEventListener(i[n],e)}

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

	
		
		//Form submission
		$(document).ready(function(){
			$('.ajax-form').submit(function(event) {
				event.preventDefault();
				var form = $(this);
				$('.ajax-form').fadeOut("400");
				$.ajax({
					url: "https://script.google.com/macros/s/AKfycbzsBxQ_0rkFBSPUoWywnvdjUfyippHomxBDDRHV2hpTmWIrYNc/exec",
					dataType: "jsonp",
					data: form.serialize()
						}).done(function(data) {
							
							$(".form-succes").fadeIn("400");
							
						}).fail(function(data) {
							
							$(".form-error").fadeIn("400");
						});
			  });
		});
		

})(jQuery);
