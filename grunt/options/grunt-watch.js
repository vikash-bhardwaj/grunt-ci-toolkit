/**
 * Watch Module
 *
 * Read More: https://github.com/gruntjs/grunt-contrib-watch
 */

module.exports = function( grunt ) {

    // WATCH
    // =================================================
    // Task to put other tasks in watch so that same can be run automatically.

    grunt.config("watch", {
		css: {
			files: '**/*.css',
			tasks: ['photobox'],
			options: {
				livereload: 80,
			},
		}
    });
};
