import $ from "jquery";
import { funcDynamic } from './dynamicScript.js';
import { areaName } from './paths.js';
import './init.js';


$(function () {

  function resizeForMap() {
    const widthD = $(window).width();;
    if (widthD >= 768) {
      $('.container-map').css('display', 'block');
    } else {
      $('.container-map').css('display', 'none');
    }
  }

  $(window).resize(function () {
    resizeForMap();
  });

  (function () {
    areaName.sort();
    areaName.forEach((el) => {
      $('.block-area').append(`<div class="text-area">${el}</div>`)
    })
  }());

  var data;
  $.ajax({
    url: "http://map.e908476u.beget.tech/api/organizations",
    success: function (result) {
      data = JSON.parse(result);;
      console.log(result);
      startGeneratePoints();
    }
  });

  function startGeneratePoints() {

    if ($('#map').length === 0) {
      funcDynamic();
    } else {
      resizeForMap();
    }
  }

  $(document).on('click', '.show-organization', function (e) {
    var id = $(e.target).data('id');
    // $(location).attr('href', window.location + $(e.target).data('id'));
    $(location).attr('href', 'primary.html' + `?id=${id}`);

  });

  $(document).on('click', '.nav-link', funcDynamic);

  $('.js-btn-glass').on('click', function () {
    window.location = window.location.origin;
  });

});
