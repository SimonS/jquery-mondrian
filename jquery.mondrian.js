// Plugin template courtesy of 
// http://www.learningjquery.com/2007/10/a-plugin-development-pattern
(function($) {
    $.fn.mondrian = function(options) {

        var opts = $.extend({}, $.fn.mondrian.defaults, options);

        return this.each(function() {
            $this = $(this);
            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			var width = $(window).width(), //$this.width(),
				height = $(window).height(); //$this.height();

			var canvas = $('<canvas id="cnv" width="'+width+'" height="'+height+'"/>')
						     .width(width)
							 .height(height)
							 .css('background-color',o.background)
							 .css({'position':'fixed',
								   'top':'0',
								   'left':'0',
								   'z-index':'-1'});

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
			x_coords.push(0);
			y_coords.push(0);

			x_coords.sort(function(a,b) {
				return a-b;
			});
			y_coords.sort(function(a,b) {
				return a-b;
			});

			$.each(o.colors, function(i,v) {
				var x = Math.floor(Math.random()*x_coords.length),
					y = Math.floor(Math.random()*y_coords.length),
					x1 = x_coords[x],
					x2 = (x < x_coords.length-1) ? x_coords[x+1] : width,
					rect_width = Math.abs(x2-x1),
					y1 = y_coords[y],
					y2 = (y < y_coords.length-1) ? y_coords[y+1] : height,
					rect_height = Math.abs(y2-y1);
				$this.mondrian.fillRect(ctx,y1,x1,rect_height,rect_width,v)
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

	$.fn.mondrian.fillRect = function(ctx, x1,y1, w,h, color) {
		ctx.fillStyle = color;
		ctx.fillRect(x1,y1,w,h);
		ctx.strokeRect(x1,y1,w,h);
		ctx.stroke()
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
