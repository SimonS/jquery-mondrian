define(['jquery', 'mondrian'], function($, Mondrian) {
    describe("Mondrian", function () {
        var canvas;

        beforeEach(function() {
            canvas = $('<canvas width="100" height="100" />')[0];
        });

        function assertPixel(x, y, rgb) {
            var pixel = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
            expect(pixel[0]).toEqual(rgb[0]);
            expect(pixel[1]).toEqual(rgb[1]);
            expect(pixel[2]).toEqual(rgb[2]);
        }

        it("should draw a line on a canvas at a given X coordinate", function() {
            var mondrian = new Mondrian(canvas);
            mondrian.drawLineX(50);
            assertPixel(0, 50, [0, 0, 0]);
        });

        it("should draw a line on a canvas at a given Y coordinate", function() {
            var mondrian = new Mondrian(canvas);
            mondrian.drawLineY(50);
            assertPixel(50, 0, [0, 0, 0]);
        });

        it("should draw a rectangle correctly", function() {
            var mondrian = new Mondrian(canvas);
            mondrian.drawRectangle(10, 10, 10, 10, '#f00');
            assertPixel(14, 14, [255, 0, 0]);
        });
    });
});
