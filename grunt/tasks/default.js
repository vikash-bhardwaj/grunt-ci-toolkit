/**
 * Project Default Task
 */

module.exports = function(grunt) {
	'use strict';

	// Default Task for Grunt
    grunt.registerTask("default", "Default task will trigger the task_prompt.", [ 
    	"prompt:choose_task",
    	"task_prompt"
    ]);
};