module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jasmine: {
            src: 'src/*.js',
            options: {
                specs: 'spec/*.js'
            }
        },
        watch: {
            files: '**/*.js',
            tasks: ['jasmine']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
