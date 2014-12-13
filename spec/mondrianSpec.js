define(['jquery', 'mondrian'], function($, Mondrian) {
    describe("Mondrian", function () {

        it("should draw a line on a canvas at a given X coordinate", function() {
            var canvas = $('<canvas width="100" height="100" />')[0];
            var mondrian = new Mondrian(canvas);

            mondrian.drawLineX(50);

            var pixel = canvas.getContext('2d').getImageData(0, 50, 1, 1).data;
            expect(pixel[0]).toEqual(0);
            expect(pixel[1]).toEqual(0);
            expect(pixel[2]).toEqual(0);
        });
    });
});
