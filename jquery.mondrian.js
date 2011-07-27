// Plugin template courtesy of 
// http://www.learningjquery.com/2007/10/a-plugin-development-pattern
(function($) {
	var $this;

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

		var canvas = $this.mondrian.createCanvas(width, height, o.background);

		if($this.x_coords === undefined) {
			$this.x_coords = $this.mondrian.generateCoordinates(o.linesX, height);
			$this.y_coords = $this.mondrian.generateCoordinates(o.linesY, width);

			$this.rects = $this.mondrian.pickRectangles(o.colors.length, width, height);
		} 

		var ctx = canvas[0].getContext("2d");
		ctx.strokeStyle = o.foreground;
		ctx.lineWidth = o.lineWidth;

		ctx = $this.mondrian.paintCanvas(ctx, $this.x_coords, $this.y_coords, width, height, o.colors);
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
	
	$.fn.mondrian.generateCoordinates = function(max_lines) {
		var coords = [];

		for(var i = 0; i < max_lines; i++) {
			coords.push(Math.random());
		}

		return coords;
	}

	$.fn.mondrian.pickRectangles = function(rectangle_count, width, height) {
		var rects = [],
			x1, x2, y1, y2, x, y, rect_height;

		$this.x_coords.sort(function(a,b) {
			return a-b;
		});
		$this.y_coords.sort(function(a,b) {
			return a-b;
		});

		for(var i = 0; i < rectangle_count; i++) {
			x = Math.floor(Math.random()*$this.x_coords.length);
			y = Math.floor(Math.random()*$this.y_coords.length);
			x1 = $this.x_coords[x];
			x2 = (x < $this.x_coords.length-1) ? $this.x_coords[x+1] : 100;
			rect_width = Math.abs(x2-x1);
			y1 = $this.y_coords[y];
			y2 = (y < $this.y_coords.length-1) ? $this.y_coords[y+1] : 100;
			rect_height = Math.abs(y2-y1);
			
			rects.push({x1:x1,y1:y1,rect_width:rect_width, rect_height:rect_height});
		}
		return rects;
	}

	$.fn.mondrian.paintCanvas = function(ctx, x_coords, y_coords, width, height, colors) {
		$.each(x_coords, function(i,v) {
			$this.mondrian.lineX(ctx, v * height);
		});

		$.each(y_coords, function(i,v) {
			$this.mondrian.lineY(ctx, v * width);
		});
		
		$.each(colors, function(i,v) {
			var rect = $this.rects[i];

			$this.mondrian.fillRect(ctx,rect.y1,rect.x1,rect.rect_height,rect.rect_width,v, width, height)
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

	$.fn.mondrian.fillRect = function(ctx, x1,y1, w,h, color, width, height) {
		ctx.fillStyle = color;
		ctx.fillRect(x1 * width,y1 * height,w * width ,h * height);
		ctx.strokeRect(x1 * width,y1 * height,w * width ,h * height);
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
