define(['jquery', 'jquery.mondrian'], function(jQuery) {
    describe("JqueryMondrian", function () {

        it("should extend jQuery with a mondrian method", function () {
            expect(jQuery.fn.mondrian).toBeDefined();
        });

        it("should paint a canvas on the window", function () {
            jQuery('body').mondrian();
            expect(jQuery('canvas').length).toEqual(1);
        });

    });
});