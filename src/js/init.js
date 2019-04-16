import $ from "jquery";
import  Raphael from 'raphael';
import {paths} from './paths.js';

$(function(){
  
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
		console.log(obj);
		obj
		.hover(function(){
			var point = this.getBBox(0);	
			$('#map').next('.point').remove();
			$('#map').after($('<div />').addClass('point'));
			$('.point')
			.html(paths[arr[this.id]].name)
			.css({
				left: point.x+(point.width/2)-80,
				top: point.y+(point.height/2)-50
			})
			.fadeIn();
			this.animate({
				fill: '#1669AD'
			}, 300);
		}, function(){
			this.animate({
				fill: attributes.fill
      }, 300);
      
		})
		.click(function(){
			document.location.hash = arr[this.id];
      overlay.attr('aria-hidden', !true);
      body.addClass('noscroll');
      overlay.scrollTop = 0;
      console.log(222);
      console.log(paths[arr[this.id]].name);
			
		});
		
		$('.overlay').find('.close').on('click', function(){
      overlay.attr('aria-hidden', true);
      body.removeClass('noscroll');
      console.log(123);
			return false;
		});
		
		
		 
		
	}
		
			
});

