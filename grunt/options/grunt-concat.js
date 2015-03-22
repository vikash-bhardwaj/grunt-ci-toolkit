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