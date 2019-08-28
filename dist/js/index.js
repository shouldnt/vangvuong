/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/index.sass":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/js/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

$(document).ready(function () {

	// scroll down
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100 && !$('.scroll-down-box').hasClass('hide')) {
			$('.scroll-down-box').addClass('hide');
		} else if ($(this).scrollTop() <= 100) {
			$('.scroll-down-box').removeClass('hide');
		}
	});

	// mobile res menu
	$('.js-mobile-menu-toggle').click(function (e) {
		e.preventDefault();
		var $menu = $('.js-mobile-menu');
		if ($menu.hasClass('opened')) {
			$menu.removeClass('opened');
		} else {
			$menu.addClass('opened');
		}
	});

	// search popup
	$('.js-search-toggle').click(function (e) {
		e.preventDefault();
		var $searchPopup = $('#search-popup');
		$searchPopup.toggleClass('opened');
	});

	// video popup
	var videoPlayer = videojs('video-frame', {
		controls: true
	});
	$('.js-play-video-btn').click(function () {
		var $this = $(this);
		var videosrc = {
			type: 'video/' + $this.attr('video-type'),
			src: $this.attr('video-url')
		};
		if (videoPlayer.playing) {
			videoPlayer.pause();
		}
		videoPlayer.src(videosrc);
		videoPlayer.src(videosrc);
		videoPlayer.play();
		$('#video-popup').addClass('opened');
	});
	$('.js-video-close').click(function () {
		videoPlayer.pause();
		$('#video-popup').removeClass('opened');
	});

	// scroll fx controller
	var controller = new ScrollMagic.Controller({ globalSceneOptions: { triggerHook: 1 } });
	var textFxController = new ScrollMagic.Controller({ globalSceneOptions: { triggerHook: 1 } });

	// space of fx
	var SceneList = [];
	var tweenList = [];
	var scrollFxDisabled = false;
	$('.fx-space').each(function (space_index, space_el) {
		var $space = $(space_el);
		var space_id = 'fx-space-' + space_index;
		var offset = parseInt($space.attr('fx-offset')) || 0;
		$space.addClass(space_id);

		var target_list = [];
		$space.find('.fx-target').each(function (target_index, target_el) {
			var $target = $(target_el);
			var target_id = space_id + '-fx-target-' + target_index;
			target_list.push('.' + target_id);
			$target.addClass(target_id);
			// animationList.push(new TweenMax.from('.' + target_id, 2.5, {ease: Power4.easeOut, y: 100, opacity: 0, delay: .2 * target_index}))
		});
		var tween = TweenMax.staggerFrom(target_list, 2.5, { ease: Power4.easeOut, y: 100, opacity: 0 }, .2);

		tweenList.push(tween);

		var reflex_list = [];
		$space.find('.fx-reflection').each(function (reflex_index, reflex_el) {
			var $reflex = $(reflex_el);
			var reflex_id = space_id + 'fx-reflextion-' + reflex_index;
			var reflex_wide = $reflex.attr('wide') || "200px";
			var start_position = $reflex.attr('start-position') || "-20px";
			var end_position = $reflex.attr('end-position') || "20px";
			var duration = parseInt($reflex.attr('duration')) || 3;
			var end_opacity = Number($reflex.attr('end-opacity')) || .5;

			$reflex.addClass(reflex_id);
			$reflex.find('.reflex').css('width', reflex_wide);
			var reflex_tween = new TweenMax.fromTo('.' + reflex_id, duration, { x: start_position, opacity: 0 }, { x: end_position, opacity: end_opacity, ease: Power4.easeOut, delay: 1 * reflex_index });
			reflex_list.push(reflex_tween);

			tweenList.push(reflex_tween);
		});

		var AllTween = new TimelineMax().add([tween].concat(reflex_list));
		tweenList.push(AllTween);
		var scene = new ScrollMagic.Scene({ triggerElement: '.' + space_id, triggerHook: 1, offset: 30 }).setTween(AllTween)
		// .addIndicators()
		.addTo(controller);
		SceneList.push(scene);
	});

	// fx for slide text
	// [].map((space, spaceIndex) => {
	[].concat(_toConsumableArray(document.querySelectorAll('.fx-text-space'))).map(function (space, spaceIndex) {
		var space_id = 'fx-text-space-' + spaceIndex;
		space.classList.add(space_id);
		var direciton = 1;

		var tweenList = [];
		[].concat(_toConsumableArray(space.querySelectorAll('.fx-text'))).map(function (text, textIndex) {
			var text_id = 'fx-text-' + textIndex;
			var direction = text.classList.contains('direction-reverse') ? -1 : 1;
			var speed = Number(text.getAttribute('speed')) || 1;
			console.log(speed);
			text.classList.add(text_id);
			tweenList.push(new TweenMax.to('.' + space_id + ' .' + text_id, 2, { x: 200 * direction * speed }));
		});

		var tween = new TimelineMax().add(tweenList);
		// console.log({[space_id]: window.clientHeight, el: space});
		var scene = new ScrollMagic.Scene({ triggerElement: '.' + space_id, triggerHook: 1, offset: 30, duration: window.innerHeight * 2 }).setTween(tween)
		// .addIndicators()
		.addTo(controller);
	});
});

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./src/js/index.js");
module.exports = __webpack_require__("./src/css/index.sass");


/***/ })

/******/ });
//# sourceMappingURL=index.js.map