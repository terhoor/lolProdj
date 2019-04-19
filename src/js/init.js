import $ from "jquery";
import Raphael from 'raphael';
import { paths } from './paths.js';

export function generateInfo(nameOrg, data) {
  var $overlay = $('.overlay');
  var $content = $('.content');
  $overlay.find('.content').empty();
  var $containerUl = $('<ul></ul>');
  data.forEach((org) => {
    if (org.area === nameOrg) {
      const elem = $(`<li><a href="#" class="content-name-area show-organization" data-id="${org.id}">${org.nameOrganization} (${org.reduction})</a></li>`);
      elem.on('click', function (e) {
        var id = $(e.target).data('id');
        $(location).attr('href', 'primary.html' + `?id=${id}`);

      })
      $containerUl.append(elem);
    }
  });


  if ($containerUl.find('li').length) {
    $containerUl.appendTo($content);
  } else {
    $('<div class="block-empty">Ничего не найдено</div>').appendTo($content);
  }
}

export function startMap(objOrg) {
  var overlay = $('.overlay');
  var body = $('body');
  var r = Raphael('map'),
    attributes = {
      fill: '#fff',
      stroke: '#3899E6',
      'stroke-width': 1,
      'stroke-linejoin': 'round'
    },
    arr = new Array();

  for (var country in paths) {

    var obj = r.path(paths[country].path);
    obj.attr(attributes);
    arr[obj.id] = country;
    obj
      .hover(function () {
        var point = this.getBBox(0);
        $('#map').after($('<div />').addClass('point'));
        $('.point')
          .html(paths[arr[this.id]].name)
          .css({
            left: point.x,
            top: point.y - 30
          })
          .fadeIn();
        this.animate({
          fill: '#1669AD'
        }, 300);
      }, function () {
        this.animate({
          fill: attributes.fill
        }, 300);

      })
      .click(function () {
        var nameArea = paths[arr[this.id]].name;
        document.location.hash = arr[this.id];
        // overlay.attr('aria-hidden', !true);
        body.addClass('noscroll');
        overlay.fadeIn();
        overlay.scrollTop = 0;
        $('.area-name').text(nameArea);
        generateInfo(nameArea, objOrg);
      });
  }

  $('#map').mouseout(function() {
    var elem = $(this).next('.point');
    if (elem.length) {
      elem.remove();
    }
  });
};
