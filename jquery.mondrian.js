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


			var ctx = canvas[0].getContext("2d");
			ctx.strokeStyle = o.foreground;
			ctx.lineWidth = o.lineWidth;
			canvas.mondrian.lineX(ctx,150);
			canvas.mondrian.lineX(ctx,250);
			canvas.mondrian.lineY(ctx,80);
			canvas.mondrian.lineY(ctx,40);

			canvas.prependTo($this);

	  		// actual code goes here
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
        background: 'yellow',
        lineWidth: 4,
	    lineCap: 'square'
    };
})(jQuery);
