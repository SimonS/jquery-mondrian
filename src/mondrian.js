define(function () {
    var cnv, ctx, opts = {
        background: '#fff',
        foreground: '#000',
        lineWidth: 4
    };

    function Mondrian(canvas, options) {
        opts = options || opts;
        cnv = canvas;
        setUpContext();
        clearCanvas();
    }

    function setUpContext() {
        ctx = cnv.getContext('2d');
        ctx.fillStyle = opts.background;
        ctx.strokeStyle = opts.foreground;
        ctx.lineWidth = opts.lineWidth;
    }

    function clearCanvas() {
        ctx.fillRect(0, 0, cnv.width, cnv.height);
    }

    Mondrian.prototype.drawLineX = function(y) {
        drawLine({x: 0, y: y}, {x: cnv.width, y: y});
    };

    Mondrian.prototype.drawLineY = function(x) {
        drawLine({x: x, y: 0}, {x: x, y: cnv.height});
    };

    function drawLine(from, to) {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }

    return Mondrian;
});
