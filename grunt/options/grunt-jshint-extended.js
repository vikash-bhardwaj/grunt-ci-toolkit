/**
 * JSHint Grunt Module
 *
 * Read More: https://github.com/vikash-bhardwaj/grunt-jshint-extended
 */

module.exports = function( grunt ) {

    // JSHINT-EXTENDED
    // =================================================
    // This is a quite advanced task created to validate the JS files by using grunt-jshint-extended module which uses grunt-contrib-jshint behind it.
    // This task is capable to generate separate error report files rather combined report for all JS files as one file

    grunt.config("jshintextended", {
        all: ['js/**/*.js', '!js/plugins/**/*.js'],
        options: {
            // JS Validation rules are configured in .jshintrc file. 
            jshintrc: '.jshintrc',
            // This is the extra Object which needs to be set with 'jshint' options. 
            jshintExtraOpts: {
                errorReportDir: "js_errors/",
                removeTempFile: true
            }
        }
    });
};