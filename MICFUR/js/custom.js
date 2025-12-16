(function() {
	'use strict';

	var tinyslider = function() {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();

	


	var sitePlusMinus = function() {

		var value,
    		quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
	      var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
	      var increase = quantityContainer.getElementsByClassName('increase')[0];
	      var decrease = quantityContainer.getElementsByClassName('decrease')[0];
	      increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
	      decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
	    }

	    function init() {
	        for (var i = 0; i < quantity.length; i++ ) {
						createBindings(quantity[i]);
	        }
	    };

	    function increaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        console.log(quantityAmount, quantityAmount.value);

	        value = isNaN(value) ? 0 : value;
	        value++;
	        quantityAmount.value = value;
	    }

	    function decreaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        value = isNaN(value) ? 0 : value;
	        if (value > 0) value--;

	        quantityAmount.value = value;
	    }
	    
	    init();
		
	};
	sitePlusMinus();
			var productImageLightbox = function() {
			return;
			var overlay = document.getElementById('image-lightbox');
			if (!overlay) return;

			var closeBtn = overlay.querySelector('.image-lightbox-close');
			var thumbs = document.querySelectorAll('.product-section .product-thumbnail');

			function openOverlay() {
				overlay.style.display = 'flex';
				overlay.setAttribute('aria-hidden', 'false');
			}

			function closeOverlay() {
				overlay.style.display = 'none';
				overlay.setAttribute('aria-hidden', 'true');
			}

			for (var i = 0; i < thumbs.length; i++) {
				thumbs[i].addEventListener('click', function(e) {
					var link = this.closest('a');
					if (link) {
						e.preventDefault();
					}
					openOverlay();
				});
			}

			if (closeBtn) {
				closeBtn.addEventListener('click', function(e) {
					e.stopPropagation();
					closeOverlay();
				});
			}

			document.addEventListener('keydown', function(e) {
				e = e || window.event;
				if (e.key === 'Escape' || e.keyCode === 27) {
					closeOverlay();
				}
			});
		};
		productImageLightbox();
		
		// Simple global navigation state for lightbox thumbnails
		window.LB = window.LB || { items: [], index: 0 };
		window.LB.items = Array.prototype.slice.call(
			document.querySelectorAll('.product-section .product-item .product-thumbnail')
		);
		window.LB.index = 0;
		
		// Global lightbox opener used by inline onclick attributes
		// For product-1..6 it tries to load a matching GLB model; otherwise shows the image
		window.openLightbox = function(e){
			if (e && e.preventDefault) e.preventDefault();
			var overlay = document.getElementById('image-lightbox');
			var imgTarget = e && e.target;
			if (!overlay || !imgTarget) return;
			
			// update LB index based on clicked thumbnail
			if (window.LB && window.LB.items && window.LB.items.length){
				var idx = window.LB.items.indexOf(imgTarget);
				if (idx === -1) idx = 0;
				window.LB.index = idx;
			}

			var mainImg = document.getElementById('lightbox-product-image');
			var mv = document.getElementById('lightbox-model');
			var statusEl = document.getElementById('lightbox-status');

			// Update title & price from the clicked card
			var card = imgTarget.closest('.product-item');
			if (card){
				var t = card.querySelector('.product-title');
				var p = card.querySelector('.product-price');
				var ti = document.getElementById('lb-title');
				var pr = document.getElementById('lb-price');
				if (ti) ti.textContent = t ? t.textContent : '';
				if (pr) pr.textContent = p ? p.textContent : '';
			}

			var src = imgTarget.getAttribute('src') || '';
			var file = src.split('/').pop();
			var base = file.replace(/\.[^/.]+$/, ''); // product-1 from images/product-1.png
			var modelUrl = 'models/' + base + '.glb';

			function setStatus(msg){
				if (!statusEl) return;
				if (msg){ statusEl.textContent = msg; statusEl.style.display = 'block'; }
				else { statusEl.textContent = ''; statusEl.style.display = 'none'; }
			}

			function showImageFallback(){
				if (!mainImg) return;
				if (mv){ mv.style.display = 'none'; mv.removeAttribute('src'); }
				mainImg.style.display = 'block';
				mainImg.src = src;
				mainImg.alt = imgTarget.getAttribute('alt') || '';
				setStatus('');
			}

			// For products 1..6 we try to show 3D via <model-viewer>
			var is3D = /^product-[1-6]$/i.test(base);
			if (is3D && mv && window.customElements && customElements.get && customElements.get('model-viewer')){
				// prepare model-viewer
				if (mainImg) mainImg.style.display = 'none';
				mv.style.display = 'block';
				mv.removeAttribute('src');
				setStatus('Loading 3D model...');

				var cleaned = false;
				function cleanup(){
					if (cleaned) return;
					cleaned = true;
					mv.removeEventListener('error', onError);
					mv.removeEventListener('load', onLoad);
				}
				function onError(){
					cleanup();
					setStatus('Failed to load 3D model');
				}
				function onLoad(){
					cleanup();
					setStatus('');
				}
				mv.addEventListener('error', onError, { once: true });
				mv.addEventListener('load', onLoad, { once: true });
				mv.setAttribute('src', modelUrl);
			} else {
				// Fallback: just show the photo
				showImageFallback();
			}

			overlay.style.display = 'flex';
			overlay.setAttribute('aria-hidden','false');
			overlay.classList.add('is-open');
		};
		
		// Arrow navigation reusing the same thumbnails and openLightbox logic
		window.lbPrev = function(){
			if (!window.LB || !window.LB.items || !window.LB.items.length) return;
			var items = window.LB.items;
			var i = window.LB.index - 1;
			if (i < 0) i = items.length - 1;
			window.LB.index = i;
			window.openLightbox({ preventDefault: function(){}, target: items[i] });
		};
		window.lbNext = function(){
			if (!window.LB || !window.LB.items || !window.LB.items.length) return;
			var items = window.LB.items;
			var i = window.LB.index + 1;
			if (i >= items.length) i = 0;
			window.LB.index = i;
			window.openLightbox({ preventDefault: function(){}, target: items[i] });
		};
		
		// Make sure color picker handler is global for inline onclick
		window.selectColor = function(el){
			var container = el && el.parentNode;
			if(!container) return;
			var dots = container.querySelectorAll('span');
			for(var i=0;i<dots.length;i++){
				dots[i].style.border = '2px solid rgba(255,255,255,0.4)';
			}
			el.style.border = '2px solid rgba(255,255,255,0.9)';
		};
		
	})()