$(document).ready(function(){
  language_complete = navigator.language.split("-");
  language = (language_complete[0]);
  console.log("Sprache (root): %s", language);

//  i18n.init({ lng: language, debug: true }, function() {
      // save to use translation function as resources are fetched
//      $(".menu").i18n();
//      $("headline").i18n();
//  });
  var resources  = {
    en: {
      translation: {
        "menu": {
          "surname": "Name:",
          "firstName": "First Name:"
        },
 
        "headline": "Data:",
        "headline_1": "Daten Common:",
        "headline_2": "Daten Specific:"
      }
    },
    dev: {
      translation: {
        "menu": {
          "surname": "Dev Name:",
          "firstName": "Dev First Name:"
        },
 
        "headline": "Data:",
        "headline_1": "Daten Common:",
        "headline_2": "Daten Specific:"
      }
    }
  };
  
  var option = {
    lng: language,
    customLoad: function(lng, ns, options, loadComplete) {
      // load the file for given language and namespace
//      var url = 'github url' + 'locales/' + lng + '/translation.json';
//      $.getJSON( "http://127.0.0.1/test.json", function( data ) {
        // callback with parsed json data
        loadComplete(null, resources.dev.translation); // or loadComplete('some error'); if failed
//      });
    }
  };
//  i18n.init({ resStore: resources, lng: language, debug: true }, function() {
//      $(".menu").i18n();
//      $("#headline").i18n();
//  });
  i18n.init(option, function() {
    $("body").i18n();
  });
});