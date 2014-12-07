// Plugin template courtesy of 
// http://www.learningjquery.com/2007/10/a-plugin-development-pattern
(function ($) {
    var $this;

    $.fn.mondrian = function (options) {

        var opts = $.extend({}, $.fn.mondrian.defaults, options);

        return this.each(function () {
            $this = $(this);

            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
            $this.colors = o.colors.slice(0);

            paint($this, o);

            $(window).resize(function () {
                var canvas = $('#cnv');
                canvas.remove();

                paint($this, o);
            });

            $this.click(function (e) {
                var x = e.clientX / $this.width,
                    y = e.clientY / $this.height,
                    nearest = getNearestXY(x, y),
                    current_color, next_color, rect_no;

                if ((rect_no = isRectFilled(nearest)) !== false) {
                    //change or delete a color
                    current_color = $this.colors[rect_no];

                    $.each(o.colors, function (i, v) {
                        if (v === current_color) {
                            next_color = i + 1;
                            if (next_color >= o.colors.length) {
                                $this.colors.splice(rect_no, 1);
                                $this.rects.splice(rect_no, 1);
                            } else {
                                $this.colors[rect_no] = o.colors[next_color];
                            }
                        }
                    });
                } else {
                    //add a color
                    next_color = 0;
                    $this.rects.push(nearest);
                    $this.colors.push(o.colors[next_color]);
                }

                $(window).trigger('resize');
            });
        });
    };

    function isRectFilled(rect) {
        var result = false;
        $.each($this.rects, function (i, v) {
            if (this.x1 === rect.x1 && this.y1 === rect.y1) {
                result = i;
            }
        });

        return result;
    }

    function paint($this, o) {
        $this.width = $(window).width();
        $this.height = $(window).height();

        var canvas = createCanvas($this.width, $this.height, o.background);

        if ($this.x_coords === undefined) {
            $this.x_coords = generateCoordinates(o.linesX, $this.height);
            $this.y_coords = generateCoordinates(o.linesY, $this.width);

            $this.rects = pickRectangles($this.colors.length, $this.width, $this.height);
        }

        var ctx = canvas[0].getContext("2d");
        ctx.strokeStyle = o.foreground;
        ctx.lineWidth = o.lineWidth;

        ctx = paintCanvas(ctx, $this.x_coords, $this.y_coords, $this.width, $this.height, $this.colors);
        canvas.prependTo($this);
    }

    function createCanvas(width, height, background) {
        return $('<canvas id="cnv" width="' + width + '" height="' + height + '"/>')
            .width(width)
            .height(height)
            .css('background-color', background)
            .css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'z-index': '-1'
            });
    }

    function getNearestXY(x, y) {
        var near_x, near_y, next_x, next_y;
        $.each($this.y_coords, function (i, v) {
            if (x > v) {
                near_y = v;
                next_y = i + 1 < $this.y_coords.length ? $this.y_coords[i + 1] : $this.width;
            }
        });

        $.each($this.x_coords, function (i, v) {
            if (y > v) {
                near_x = v;
                next_x = i + 1 < $this.x_coords.length ? $this.x_coords[i + 1] : $this.height;
            }
        });

        return {x1: near_x, y1: near_y, rect_height: next_y - near_y, rect_width: next_x - near_x};
    }

    function generateCoordinates(max_lines) {
        var coords = [];

        for (var i = 0; i < max_lines; i++) {
            coords.push(Math.random());
        }

        return coords;
    }

    function pickRectangles(rectangle_count, width, height) {
        var rects = [],
            x1, x2, y1, y2, x, y, rect_height, rect_width;

        $this.x_coords.push(0);
        $this.y_coords.push(0);

        $this.x_coords.sort(function (a, b) {
            return a - b;
        });
        $this.y_coords.sort(function (a, b) {
            return a - b;
        });

        for (var i = 0; i < rectangle_count; i++) {
            x = Math.floor(Math.random() * $this.x_coords.length);
            y = Math.floor(Math.random() * $this.y_coords.length);
            x1 = $this.x_coords[x];
            x2 = (x < $this.x_coords.length - 1) ? $this.x_coords[x + 1] : 100;
            rect_width = Math.abs(x2 - x1);
            y1 = $this.y_coords[y];
            y2 = (y < $this.y_coords.length - 1) ? $this.y_coords[y + 1] : 100;
            rect_height = Math.abs(y2 - y1);

            rects.push({x1: x1, y1: y1, rect_width: rect_width, rect_height: rect_height});
        }
        return rects;
    }

    function paintCanvas(ctx, x_coords, y_coords, width, height, colors) {
        $.each(colors, function (i, v) {
            var rect = $this.rects[i];

            fillRect(ctx, rect.y1, rect.x1, rect.rect_height, rect.rect_width, $this.colors[i], width, height);
        });

        $.each(x_coords, function (i, v) {
            lineX(ctx, v * height);
        });

        $.each(y_coords, function (i, v) {
            lineY(ctx, v * width);
        });

        return ctx;
    }

    function lineX(ctx, y) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        ctx.stroke();
    }

    function lineY(ctx, x) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        ctx.stroke();
    }

    function fillRect(ctx, x1, y1, w, h, color, width, height) {
        ctx.fillStyle = color;
        ctx.fillRect(x1 * width, y1 * height, w * width, h * height);
        ctx.stroke();
    }

    $.fn.mondrian.defaults = {
        foreground: '#000',
        background: '#fff',
        lineWidth: 3,
        lineCap: 'square',
        linesX: 4,
        linesY: 6,
        colors: ['red', 'green', 'blue']
    };
})(jQuery);
