define(function () {
    var cnv, ctx, opts = {
        background: '#fff',
        foreground: '#000',
        lineWidth: 4
};

    function Mondrian(canvas, options) {
        opts = options || opts;
        cnv = canvas;
        ctx = cnv.getContext('2d');
        ctx.fillStyle = opts.background;
        ctx.strokeStyle = opts.foreground;
        ctx.lineWidth = opts.lineWidth;
        clearCanvas();
    }

    function clearCanvas() {
        ctx.fillRect(0, 0, cnv.width, cnv.height);
    }

    Mondrian.prototype.drawLineX = function(y) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cnv.width, y);
        ctx.stroke();
    };

    return Mondrian;
});
