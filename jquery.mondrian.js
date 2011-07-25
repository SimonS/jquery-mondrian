// Plugin template courtesy of 
// http://www.learningjquery.com/2007/10/a-plugin-development-pattern
(function($) {
    $.fn.mondrian = function(options) {

        var opts = $.extend({}, $.fn.mondrian.defaults, options);

        return this.each(function() {
            $this = $(this);


            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			$this.mondrian.paint($this, o);

			$(window).resize(function() {
				var canvas = $('#cnv');
				canvas.remove();	

			$this.mondrian.paint($this, o);
			});
        });
    };
    
	$.fn.mondrian.paint = function($this, o) {
		var width = $(window).width(), //$this.width(),
			height = $(window).height(); //$this.height();

		var canvas = $this.mondrian.createCanvas(width, height, o.background),
			x_coords = $this.mondrian.generateCoordinates(o.linesX, height),
			y_coords = $this.mondrian.generateCoordinates(o.linesY, width);

		var ctx = canvas[0].getContext("2d");
		ctx.strokeStyle = o.foreground;
		ctx.lineWidth = o.lineWidth;

		ctx = $this.mondrian.paintCanvas(ctx, x_coords, y_coords, width, height, o.colors);
		canvas.prependTo($this);
	}

  	$.fn.mondrian.createCanvas = function(width, height, background) {
		return $('<canvas id="cnv" width="'+width+'" height="'+height+'"/>')
				.width(width)
				.height(height)
				.css('background-color',background)
				.css({'position':'fixed',
					'top':'0',
					'left':'0',
					'z-index':'-1'});
	}
	
	$.fn.mondrian.generateCoordinates = function(max_lines, max_value) {
		var coords = [];

		for(var i = 0; i < max_lines; i++) {
			coords.push(Math.floor(Math.random() * max_value));
		}

		return coords;
	}

	$.fn.mondrian.paintCanvas = function(ctx, x_coords, y_coords, width, height, colors) {
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

		$.each(colors, function(i,v) {
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

		return ctx;

	}

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
