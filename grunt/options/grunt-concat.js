/**
 * CONCAT Module
 *
 * Read More: https://github.com/gruntjs/grunt-contrib-concat
 */  

module.exports = function( grunt ) {
    
    // CONCAT
    // =================================================
    // Task to concat JS and CSS files for the project

    grunt.config("concat", {
        js: {
            options: {
                separator: ';',
            },
            files: {
                'js/combined.js': [
                    'js/test.js',
                    'js/test1.js',
                    'js/test2.js',
                    'js/test3.js',
                    'js/test4.js',
                    'js/test5.js'
                ]
            }
        },
        css: {
            files: {
                'css/css.combined.css': [
                    'css/test.style.css',
                    'css/test1.style.css',
                    'css/test2.style.css',
                    'css/jquery-ui-1.10.4.custom.css'
                ]
            }
        }
    });
};