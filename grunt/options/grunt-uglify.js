/**
 * JS UGLIFY Module
 *
 * Read More: https://github.com/gruntjs/grunt-contrib-uglify
 */  

module.exports = function( grunt ) {
    
    // UGLIFY
    // =================================================
    // Task to minify the JS files

    grunt.config("uglify", {
        options: {
            mangle: true
        },
        my_target: {
            files: {
                'js/combined.min.js': ['js/combined.js']
            }
        }
    });
};