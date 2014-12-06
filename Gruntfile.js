module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jasmine: {
            src: 'src/*.js',
            options: {
                specs: 'spec/*.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
};
