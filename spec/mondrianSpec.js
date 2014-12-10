define(['jquery', 'jquery.mondrian'], function(jQuery) {
    describe("JqueryMondrian", function () {

        it("should extend jQuery with a mondrian method", function () {
            expect(jQuery.fn.mondrian).toBeDefined();
        });

    });
});