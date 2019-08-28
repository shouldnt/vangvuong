$(document).ready(function() {

	// scroll down
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100 && !$('.scroll-down-box').hasClass('hide')) {
			$('.scroll-down-box').addClass('hide');
		} else if( $(this).scrollTop() <= 100 ) {
			$('.scroll-down-box').removeClass('hide');
		}
	});	


	// mobile res menu
	$('.js-mobile-menu-toggle').click(function(e) {
		e.preventDefault();
		let $menu = $('.js-mobile-menu');
		if($menu.hasClass('opened')) {
			$menu.removeClass('opened');
		} else {
			$menu.addClass('opened');
		}
	})

	// search popup
	$('.js-search-toggle').click(function(e) {
		e.preventDefault();
		let $searchPopup = $('#search-popup');
		$searchPopup.toggleClass('opened');
	})

	// video popup
	let videoPlayer = videojs('video-frame', {
		controls: true
	});
	$('.js-play-video-btn').click(function() {
		let $this = $(this);
		let videosrc = {
			type: 'video/' + $this.attr('video-type'),
			src: $this.attr('video-url')
		}
		if(videoPlayer.playing) {
			videoPlayer.pause();
		}
		videoPlayer.src(videosrc);
		videoPlayer.src(videosrc);
		videoPlayer.play();
		$('#video-popup').addClass('opened');
	})
	$('.js-video-close').click(function() {
		videoPlayer.pause();
		$('#video-popup').removeClass('opened');
	})

	// scroll fx controller
	let controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: 1}});
	let textFxController = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: 1}})

	// space of fx
	let SceneList = [];
	let tweenList = [];
	let scrollFxDisabled = false;
	$('.fx-space').each(function(space_index, space_el) {
		let $space = $(space_el);
		let space_id = 'fx-space-' + space_index;
		let offset = parseInt($space.attr('fx-offset')) || 0;
		$space.addClass(space_id);

		let target_list = [];
		$space.find('.fx-target').each(function(target_index, target_el) {
			let $target = $(target_el);
			let target_id = space_id + '-fx-target-' + target_index;
			target_list.push('.' + target_id);
			$target.addClass(target_id);
			// animationList.push(new TweenMax.from('.' + target_id, 2.5, {ease: Power4.easeOut, y: 100, opacity: 0, delay: .2 * target_index}))
		})
		let tween = TweenMax.staggerFrom(target_list, 2.5, {ease: Power4.easeOut, y: 100, opacity: 0}, .2);

		tweenList.push(tween);

		let reflex_list = [];
		$space.find('.fx-reflection').each(function(reflex_index, reflex_el) {
			let $reflex = $(reflex_el);
			let reflex_id = space_id + 'fx-reflextion-' + reflex_index;
			let reflex_wide = $reflex.attr('wide') || "200px"
			let start_position = $reflex.attr('start-position') || "-20px";
			let end_position = $reflex.attr('end-position') || "20px";
			let duration = parseInt($reflex.attr('duration')) || 3;
			let end_opacity = Number($reflex.attr('end-opacity')) || .5

			$reflex.addClass(reflex_id);
			$reflex.find('.reflex').css('width', reflex_wide);
			let reflex_tween = new TweenMax.fromTo('.' + reflex_id, duration, {x: start_position, opacity: 0}, { x: end_position, opacity: end_opacity, ease: Power4.easeOut, delay: 1 * reflex_index});
			reflex_list.push(reflex_tween);

			tweenList.push(reflex_tween);
		});

		let AllTween = new TimelineMax().add([tween, ...reflex_list]);
		tweenList.push(AllTween);
		let scene = new ScrollMagic.Scene({triggerElement: '.' + space_id, triggerHook: 1, offset: 30})
				.setTween(AllTween)
				// .addIndicators()
				.addTo(controller);
		SceneList.push(scene);
	});

	// fx for slide text
	// [].map((space, spaceIndex) => {
	[...document.querySelectorAll('.fx-text-space')].map((space, spaceIndex) => {
		let space_id = 'fx-text-space-' + spaceIndex;
		space.classList.add(space_id);
		let direciton = 1;

		let tweenList = [];
		[...space.querySelectorAll('.fx-text')].map((text, textIndex) => {
			let text_id = 'fx-text-' + textIndex;
			let direction = text.classList.contains('direction-reverse') ? -1 : 1;
			let speed = Number(text.getAttribute('speed')) || 1;
			console.log(speed);
			text.classList.add(text_id);
			tweenList.push(new TweenMax.to('.' + space_id + ' .' + text_id, 2, {x: 200 * direction * speed}));
		})

		let tween = new TimelineMax().add(tweenList);
		// console.log({[space_id]: window.clientHeight, el: space});
		let scene = new ScrollMagic.Scene({triggerElement: '.' + space_id, triggerHook: 1, offset: 30, duration: window.innerHeight * 2})
				.setTween(tween)
				// .addIndicators()
				.addTo(controller);
	})

});