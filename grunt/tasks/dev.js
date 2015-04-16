/**
 * Project Dev Task
 */

module.exports = function(grunt) {
	'use strict';

	// Dev Task for Grunt
    grunt.registerTask( "dev", "Task for Dev build purpose where minified versions will not run.", [
    	"validatealljs",
    	"concat",
    	"cssmin",
    	"validation",
	"phantomas"
    ]);
};
