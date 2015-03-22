/**
 * JSHint Grunt Module
 *
 * Read More: https://github.com/gruntjs/grunt-contrib-jshint
 */

module.exports = function( grunt ) {
    // Directory path for jshint error files path.
    grunt.config.set("jsErrorFilesPath", "js/errors/");

    // JS Files Globbing Pattern to be validated.
    grunt.config.set("jsFilesToBeValidated", ['js/**/*.js', '!js/plugins/**/*.js']);

    // JSHINT
    // =================================================
    // This is a quite advanced task created to validate the JS files by using grunt-contrib-jshint module
    // This task is capable to generate separate error report files rather combined report for all JS files as one file
    // This task gets updated for subtasks dynamically by different tasks like "validatealljs, validatejs and validateselectedjs"
    // you would like to run with a UI

    grunt.config("jshint", {
        options: {

            // This will generate the report in HTML format.
            // JS Validation rules are configured in .jshintrc file.

            reporter: require('jshint-html-reporter'),
            jshintrc: '.jshintrc'
        }
    });

    // LOAD CUSTOM REGISTERED TASKS
    // =======================================================
    // This below command load all the custom tasks mentioned from JS files under "grunt_tasks" directory.
    grunt.loadTasks('grunt/custom_tasks');
};