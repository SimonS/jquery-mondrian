// Plugin template courtesy of 
// http://www.learningjquery.com/2007/10/a-plugin-development-pattern
(function($) {

    $.fn.mondrian = function(options) {

        var opts = $.extend({}, $.fn.mondrian.defaults, options);

        return this.each(function() {
            $this = $(this);
            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

	  		// actual code goes here
        });
    };

    $.fn.mondrian.defaults = {
        foreground: 'red',
        background: 'yellow'
    };
})(jQuery);
