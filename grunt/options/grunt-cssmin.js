/**
 * CSSMIN Module
 *
 * Read More: https://github.com/gruntjs/grunt-contrib-cssmin
 */  

module.exports = function( grunt ) {
    
    // CSSMIN
    // =================================================
    // Task to minify the CSS files

    grunt.config("cssmin", {
        minify: {
            expand: true,
            cwd: 'css',
            src: ['*.css', '!*.min.css'],
            dest: 'css',
            rename: function(dest, src) {
                var folder = src.substring(0, src.lastIndexOf('/')),
                    filename = src.substring(src.lastIndexOf('/'), src.length);

                filename = filename.substring(0, filename.lastIndexOf('.'));
                return dest + folder + "/" + filename + '.min.css';
            }
        }
    });
};