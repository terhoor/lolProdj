import $ from "jquery";
import popper from "popper.js";
import bootstrap from "bootstrap";
import { funcDynamic } from './dynamicScript.js';

$(function () {
  var data;
  $.ajax({
    url: "http://map.e908476u.beget.tech/api/organizations",
    success: function (result) {
      data = JSON.parse(result);;
      startGeneratePoints();
    }
  });

  function startGeneratePoints() {
    if ($('#map').length) {
      ymaps.ready(init);
      function init() {
        // Создание карты.    
        var myMap = new ymaps.Map("map", {
          center: [54.0, 48.0],
          zoom: 7,
          controls: ['zoomControl']
        });

        var myPlacemark;
        data.forEach((item) => {
          myPlacemark = new ymaps.Placemark([item.longitude, item.latitude], {
            // Хинт показывается при наведении мышкой на иконку метки.
            hintContent: `${item.nameOrganization}`,
            // Балун откроется при клике по метке.
            balloonContent: `<button class="show-organization" data-id="${item.id}">Показать информацию</button>`,
            hintContent: 'Учебное заведение'
          });
          myMap.geoObjects.add(myPlacemark);

        });
      }
    } else {
      funcDynamic();
    }
  }

  $(document).on('click', '.show-organization', function (e) {
    var id = $(e.target).data('id');
    // $(location).attr('href', window.location + $(e.target).data('id'));
    $(location).attr('href', 'primary.html' + `?id=${id}`);

  });

  $(document).on('click', '.nav-link', funcDynamic);

});
