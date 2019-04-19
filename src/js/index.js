import "bootstrap";
import $ from "jquery";
import { funcDynamicForPage } from './dynamicScript.js';
import { areaName } from './paths.js';
import { startMap, generateInfo } from './init.js';


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
    funcForMap();

    if ($('#map').length === 0) {
      funcDynamicForPage();
    } else {
      $(window).resize(function () {
        resizeForMap();
      });
      resizeForMap();
    }
  }

  function funcForMap() {
    $('.js-popup').on('click', function () {
      var overlay = $('.overlay');
      var body = $('body');
      var nameArea = $(this).text();
      document.location.hash = nameArea;
      body.addClass('noscroll');
      overlay.fadeIn();
      // overlay.attr('aria-hidden', !true);
      overlay.scrollTop = 0;
      $('.area-name').text(nameArea);
      generateInfo(nameArea, objOrg);
    });
  
    $('.overlay').on('click', function () {
      var overlay = $('.overlay');
      var body = $('body');
      var target = event.target;
      const overlayS = $(target).is('.overlay') || $(target).is('.close');
      const closeS = $(target).is('.close');
      if (overlayS || closeS) {
        // overlay.attr('aria-hidden', true);
        overlay.fadeOut('fast', function() {
          body.removeClass('noscroll');
        });
      }
  
      return false;
    });
  }
});
