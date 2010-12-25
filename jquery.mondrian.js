// Plugin template courtesy of 
// http://www.learningjquery.com/2007/10/a-plugin-development-pattern
(function($) {
    $.fn.mondrian = function(options) {

        var opts = $.extend({}, $.fn.mondrian.defaults, options);

        return this.each(function() {
            $this = $(this);
            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			var width = $this.width(),
				height = $this.height();

			var canvas = $('<canvas id="cnv" width="'+width+'" height="'+height+'"/>')
						     .width(width)
							 .height(height)
							 .css('background-color',o.background)
							 .css({'position':'absolute',
								   'top':'0',
								   'left':'0'});

			var x_coords = [],
				y_coords = [];

			for(i = 0; i < o.linesX; i++) {
				x_coords.push(Math.floor(Math.random() * height));
			}
			for(i = 0; i < o.linesY; i++) {
				y_coords.push(Math.floor(Math.random() * width));
			}

			var ctx = canvas[0].getContext("2d");
			ctx.strokeStyle = o.foreground;
			ctx.lineWidth = o.lineWidth;

			$.each(x_coords, function(i,v) {
				$this.mondrian.lineX(ctx, v);
			});

			$.each(y_coords, function(i,v) {
				$this.mondrian.lineY(ctx, v);
			});

			canvas.prependTo($this);
        });
    };
    
    $.fn.mondrian.lineX = function(ctx,y) {
		ctx.beginPath();
		ctx.moveTo(0,y);
		ctx.lineTo(ctx.canvas.width,y);
		ctx.stroke();
	}
	
	$.fn.mondrian.lineY = function(ctx,x) {
		ctx.beginPath();
		ctx.moveTo(x,0);
		ctx.lineTo(x,ctx.canvas.height);
		ctx.stroke();
	}

    $.fn.mondrian.defaults = {
        foreground: '#000',
        background: '#fff',
        lineWidth: 3,
	    lineCap: 'square',
		linesX: 4,
		linesY: 6,
		colors: ['red','green','blue']
    };
})(jQuery);
