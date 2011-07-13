Small jQuery plugin which generates Piet Mondrian-style canvases and places it as a background on selected elements.

Only really tested in modern (non-IE) browsers on divs and the body (see it in use at [http://breakfastdinnertea.co.uk](http://breakfastdinnertea.co.uk)).

Customisable settings:

    $.fn.mondrian.defaults = {
        foreground: '#000',
		background: '#fff',
        lineWidth: 3,
		lineCap: 'square',
        linesX: 4,
		linesY: 6,
        colors: ['red','green','blue']
    };

