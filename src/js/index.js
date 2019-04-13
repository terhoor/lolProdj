import $ from "jquery";
import { funcDynamic } from './dynamicScript.js';
import './init.js';


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
    if ($('#map').length === 0) {
      funcDynamic();
    }
  }

  $(document).on('click', '.show-organization', function (e) {
    var id = $(e.target).data('id');
    // $(location).attr('href', window.location + $(e.target).data('id'));
    $(location).attr('href', 'primary.html' + `?id=${id}`);

  });

  $(document).on('click', '.nav-link', funcDynamic);

  $('.js-btn-glass').on('click', function() {
    window.location = window.location.origin;
  });

});
