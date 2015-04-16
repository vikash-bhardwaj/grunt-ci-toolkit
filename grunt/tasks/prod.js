/**
 * Project Prod Task
 */

module.exports = function(grunt) {
	'use strict';

	// Prod Task for Grunt
    grunt.registerTask( "prod", "Task for Prod build purpose where Minify will run.", [
    	"validatealljs",
    	"concat",
    	"cssmin",
    	"uglify",
    	"validation",
	"phantomas",
	"sitespeedio"
    ]);
};
