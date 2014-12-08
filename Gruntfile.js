module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jasmine: {
            src: 'src/*.js',
            options: {
                vendor: [
                    'bower_components/jquery/dist/jquery.js'
                ],
                specs: 'spec/*.js'
            }
        },
        watch: {
            files: '**/*.js',
            tasks: ['jasmine']
        },
        jshint: {
            all: ['Gruntfile.js', 'src/*.js', 'spec/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('default', ['test']);
};
