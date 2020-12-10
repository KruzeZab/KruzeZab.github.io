function success() {
  form.reset();
  status.innerHTML = 'Thanks!';
}

function error() {
  status.innerHTML = 'Oops! There was a problem.';
}

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

$(document).ready(function () {
  new WOW().init();

  var form = document.getElementById('contact-form');
  var button = document.getElementById('btn-submit');
  var status = document.getElementById('alert__message');

  var alert = $('#alert');

  // Navbar Toggler
  $('.navbar__toggler').click(function () {
    $(this).toggleClass('change');
    $('.nav-items').stop(true).slideToggle(300);
  });

  //Scroll Event
  var scrollLink = $('.scroll');
  scrollLink.click(function (e) {
    e.preventDefault();
    $('body,html').animate(
      {
        scrollTop: $(this.hash).offset().top - 100,
      },
      1000
    );
  });

  //Contact form submit
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(
      form.method,
      form.action,
      data,
      function () {
        form.reset();
        status.innerHTML = 'Email Sent Successfully !';

        alert.css('background-color', 'green');

        alert.fadeIn('slow');

        setTimeout(function () {
          alert.fadeOut('slow');
        }, 2000);
      },
      function () {
        alert.css('background-color', 'red');
        status.innerHTML =
          'There was a problem sending email. Please try again!';
      }
    );
  });
});