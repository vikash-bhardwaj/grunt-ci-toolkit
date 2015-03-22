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
                'js/output.min.js': [
                    'js/test.js',
                    'js/test1.js',
                    'js/test2.js',
                    'js/test3.js',
                    'js/test4.js',
                    'js/test5.js'
                ]
            }
        }
    });
};