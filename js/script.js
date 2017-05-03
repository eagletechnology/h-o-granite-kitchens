// Contact form handlers.... > JQUERY

var $contactForm = $('#contact-form');

$contactForm.submit(function(e) {
  e.preventDefault();
  var $submit = $('input:submit', $contactForm);
  var defaultSubmitText = $submit.val();

  $.ajax({
    url: '//formspree.io/saymorechifamba@gmail.com',
    method: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    beforeSend: function() {
      //$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
      $submit.attr('disabled', true).val('Sending message…');
    },
    success: function(data) {
      //$contactForm.append('<div class="alert alert--success">Message sent!</div>');
      $submit.val('Message sent!');
      setTimeout(function() {
        //$('.alert--success').remove();
        $submit.attr('disabled', false).val(defaultSubmitText);
      }, 5000);
    },
    error: function(err) {
      //$contactForm.find('.alert--loading').hide();
      //$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
      $submit.val('Ops, there was an error.');
      setTimeout(function() {
        //$('.alert--error').remove();
        $submit.attr('disabled', false).val(defaultSubmitText);
      }, 5000);
    }
  });
});

// End of contact form handlers

$(document).on('click', '#bs-example-navbar-collapse-1.in a', function(e) {
$("#bs-example-navbar-collapse-1").removeClass("in");//.addClass("collapse");
});

//IIFE's
(function (global) {

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};


// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Remove the class 'active' from all menu buttons
var switchOffActive = function () {
  // Remove 'active' from all buttons

  var ids = [
    "#navHomeButton", "#navGalleryButton",
    "#navAboutUsButton"];

  for (var i = 0; i < ids.length; i++) {
      var classes = document.querySelector(ids[i]).className;
      classes = classes.replace(new RegExp("active", "g"), "");
      document.querySelector(ids[i]).className = classes;
  }
};


var switchOnActive = function (id) {
    // switch on active for the given id
  switchOffActive ();
  classes = document.querySelector(id).className;
  classes += " active";
  document.querySelector(id).className = classes;
};

var dc = {};

var homeHtml = "snippets/home.html";
var aboutGraniteHtml = "snippets/about_granite.html";
var galleryHtml = "snippets/gallery.html";
var contactHtml = "snippets/contact.html";


// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
    switchOnActive("#navHomeButton");
  });
});


// Load the home view
dc.loadHome = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  });
};

// Load the donation view
dc.loadContactUs = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
  contactHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
    switchOffActive();
  });
};

// Load the gallery view
dc.loadGallery = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
  galleryHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  switchOnActive ("#navGalleryButton");
  });
};

// Load the about granite view
dc.loadAboutGranite = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
  aboutGraniteHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  switchOnActive ("#navAboutUsButton");
  });
};


global.$dc = dc;
})(window);
