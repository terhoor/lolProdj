import $ from "jquery";
import  Raphael from 'raphael';
import {paths} from './paths.js';

$(function(){
	
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
			
			var point = this.getBBox(0);
			
			$('#map').next('.point').remove();
			
			$('#map').after($('<div />').addClass('point'));
			
			$('.point')
			.html(paths[arr[this.id]].name)
			.prepend($('<a />').attr('href', '#').addClass('close').text('Закрыть'))
			.prepend($('<img />').attr('src', 'flags/'+arr[this.id]+'.png'))
			.css({
				left: point.x+(point.width/2)-80,
				top: point.y+(point.height/2)-20
			})
			.fadeIn();
			
		});
		
		$(document).find('.point .close').on('click', function(){
			var t = $(this),
				parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
		
		
		 
		
	}
		
			
});

