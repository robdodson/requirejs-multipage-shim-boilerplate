/*global module:false*/
'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',

        clean: {
            folder: 'www-release'
        },

        mincss: {
            dist: {
                files: {
                  
                }
            }
        }
    });

    // Load tasks from NPM
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-mincss');

    // Default task.
    grunt.registerTask('default', 'clean less mincss copy');

};
