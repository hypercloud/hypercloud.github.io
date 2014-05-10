jQuery(function($) {

	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 10000,
			pause: false
		});
	});

	//Ajax contact
	var form = $('.contact-form');
	form.submit(function () {
		$this = $(this);
		$.post($(this).attr('action'), function(data) {
			$this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
		},'json');
		return false;
	});

	//smooth scroll
	$('.navbar-nav > li').click(function(event) {
		event.preventDefault();
		var target = $(this).find('>a').prop('hash');
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 500);
	});

	//scrollspy
	$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh')
	})

	//PrettyPhoto
	$("a.preview").prettyPhoto({
		social_tools: false
	});

	//Isotope
	$(window).load(function(){
		$portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : 'li',
			layoutMode : 'fitRows'
		});
		$portfolio_selectors = $('.portfolio-filter >li>a');
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});
	
	//I18n
	language_complete = navigator.language.split("-");
	language = (language_complete[0]);
	console.log("Sprache: %s", language);
	
	var option = {
		lng: language,
		customLoad: function(lng, ns, options, loadComplete) {
			var url = 'locales/' + lng + '/translation.json';
			$.getJSON(url, function(data) {
				// callback with parsed json data
				loadComplete(null, data); // or loadComplete('some error'); if failed
			});
		}
	};
	
	i18n.init(option, function() {
		$("body").i18n();
	});
	
});