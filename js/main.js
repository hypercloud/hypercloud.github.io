jQuery(function($) {

	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 5000,
			pause: false
		});
	});

	language_complete = navigator.language.split("-");
	language = (language_complete[0]);
	console.log("Sprache: %s", language);
	
	//Language selector
	var available_languages = {
	    zh: 'CHN',
		de: 'DEU',
		en: 'USA'
	};
	
	if (available_languages.hasOwnProperty(language)) {
		$("a.language").attr('id', language);
		$("a.language").attr('data-i18n', '[html]dropdown.a.' + language);
//		$("a.language").text(available_languages[language]).append('<b class="caret"></b>');
	} else {
		//Default language
		$("a.language").attr('id', 'en');
		$("a.language").attr('data-i18n', '[html]dropdown.a.en');
//		$("a.language").text('USA').append('<b class="caret"></b>');
	}

	//I18n
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
	
	$('.dropdown-menu a').click(function(e){
		e.preventDefault();
		console.log('click event');
		$this = $(this);
		console.log($(this).attr("id"));
		var language = $(this).attr("id");
		$("a.language").attr('id', language);
		$("a.language").attr('data-i18n', '[html]dropdown.active.' + language);
		option.lng = language;
		console.log(option);
		i18n.init(option, function() {
			$("body").i18n();
		});
	});
	
	//Ajax contact
	var form = $('.contact-form');
	form.submit(function () {
		$this = $(this);
		var formURL = $(this).attr("action");
		var data = {
			"key": "02wU9zU4BFKK-FNlxs7Q1Q",
			"message": {
				"html": $('#message').val(),
				"text": $('#message').val(),
				"subject": "Contact",
				"from_email": $('#email').val(),
				"from_name": $('#username').val(),
				"to": [{
					"email": "kevinprotoss.wei@gmail.com",
					"name": "Junxiang Wei"
				}]
			},
			"async": true
		};

		$.ajax({
			type: "POST",
			url: formURL,
			data: data
		}).done(function() {
			statusMsg = 'Email sent!';
			$this.prev().text(statusMsg).fadeIn().delay(3000).fadeOut();
			$this[0].reset();
		}).fail(function() {
			statusMsg = 'Failed sending email!';
			$this.prev().text(statusMsg).fadeIn().delay(3000).fadeOut();
		});

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
	
});