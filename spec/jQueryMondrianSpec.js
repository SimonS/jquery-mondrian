define(['jquery', 'jquery.mondrian'], function(jQuery) {
    describe("jQueryMondrian", function () {

        it("should extend jQuery with a mondrian method", function () {
            expect(jQuery.fn.mondrian).toBeDefined();
        });

        // At this point the jQuery bits are terribly broken and only generate
        // a canvas on the window.
        it("should paint a canvas on the window", function () {
            jQuery('body').mondrian();
            expect(jQuery('canvas').length).toEqual(1);
        });

        // Next I plan to split out the context drawing logic into its own method
        // So expect the next test to be against a mock

    });
});