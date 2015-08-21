/**
 * Grunt Photobox Module for Creative QA
 *
 * Read More: https://github.com/stefanjudis/grunt-photobox
 */  

module.exports = function( grunt ) {

    // PHOTOBOX
    // =================================================
    // Task to validate and generate two set of URLs for finding Visual Discrepancies.

    grunt.config("photobox", {
		local : {
		  options : {
			screenSizes : [ '1024'], 	
			relativePaths  : true,
			urls           : [ 'http://localhost/PS_Local/personalStore.html', 'http://www.google.co.in' ]
		  }
		},
		prod : {
		  options : {
			screenSizes : [ '1024'], 	
			relativePaths  : true,
			urls           : [ 'http://localhost/PS_QA/personalStore.html','http://www.google.fr' ]
		  }
		}
    });
};