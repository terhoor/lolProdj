import $ from "jquery";
import Raphael from 'raphael';
import { paths } from './paths.js';

function generateInfo (nameOrg, data) {
  var $overlay = $('.overlay');
  var $content = $('.content');
  $overlay.find('.content').empty();
  var $containerUl = $('<ul></ul>');
  data.forEach((org) => {
    if (org.area === nameOrg) {
      console.log(org);
      $containerUl.append(`<li><a class="content-name-area show-organization" data-id="${org.id}">${org.nameOrganization} (${org.reduction})</a></li>`)
    }
  });

  
  if ($containerUl.find('li').length) {
    $containerUl.appendTo($content);
  } else {
    $('<div class="block-empty">Ничего не найдено</div>').appendTo($content);
  }
}


export function startMap (objOrg) {

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
        $('#map').next('.point').remove();
        $('#map').after($('<div />').addClass('point'));
        $('.point')
          .html(paths[arr[this.id]].name)
          .css({
            left: point.x + (point.width / 2) - 80,
            top: point.y + (point.height / 2) - 50
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
        overlay.attr('aria-hidden', !true);
        body.addClass('noscroll');
        overlay.scrollTop = 0;
        $('.area-name').text(nameArea);
         generateInfo(nameArea, objOrg);
      });

  }

  $('.overlay').on('click', function () {
    var overlay = $('.overlay');
    var body = $('body');
    var target = event.target;
    const overlayS = $(target).is('.overlay') || $(target).is('.close');
    const closeS = $(target).is('.close');
    if (overlayS || closeS) {
      overlay.attr('aria-hidden', true);
      body.removeClass('noscroll');
    }

    return false;
  });

};

