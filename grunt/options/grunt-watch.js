/**
 * Page Load Performance Analysis Module
 */  

module.exports = function( grunt ) {

    // Site Speed and Performance Analysis of Page
    // =================================================
    // Task to run Analyze about website speed and performance.
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
