import "bootstrap";
import $ from "jquery";
import { funcDynamicForPage } from './dynamicScript.js';
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
      funcDynamicForPage();
    } else {
      $(window).resize(function () {
        resizeForMap();
      });
      resizeForMap();
    }
  }
});
