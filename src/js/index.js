import "bootstrap";
import $ from "jquery";
import { funcDynamic } from './dynamicScript.js';
import { areaName } from './paths.js';
import { startMap } from './init.js';


$(function () {
  var mapFlag = false;
  function resizeForMap() {
    const widthD = $(window).width();;
    if (widthD >= 768) {
      $('.container-map-md').css('display', 'block');
      if (!mapFlag) {
        mapFlag = true;
        startMap(objOrg);
      }

    } else {
      mapFlag = false;
      $('.container-map-md').css('display', 'none').find('#map').empty();
    }
  }

  (function () {
    areaName.sort();
    areaName.forEach((el) => {
      $('.block-area').append(`<div class="text-area js-popup">${el}</div>`)
    })
  }());

  var objOrg;
  $.ajax({
    url: "http://map.e908476u.beget.tech/api/organizations",
    success: function (result) {
      objOrg = JSON.parse(result);;
      startGeneratePoints();
    }
  });

  function startGeneratePoints() {

    if ($('#map').length === 0) {
      funcDynamic();
    } else {
      $(window).resize(function () {
        resizeForMap();
      });
      resizeForMap();
    }
  }

  $(document).on('click', '.nav-link', funcDynamic);

  $('.js-btn-glass, .block-ornament').on('click', function () {
    window.location = window.location.origin;
  });

});
