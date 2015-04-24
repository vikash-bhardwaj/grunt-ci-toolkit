/**
 * W3C Validation Module
 *
 * Read More: https://github.com/vikash-bhardwaj/grunt-w3c-html-validation
 */  

module.exports = function( grunt ) {

    // VALIDATION
    // =================================================
    // Task to validate and generate report of W3C Testing for configured URLs.

    grunt.config("validation", {
        options: {
            reset: true, //Resets all the validated files status. When want to revalidate all the validated files 
            stoponerror: false, //If this is set to true, validator will stop validating next file
            remotePath: "http://www.w3schools.com/",
            remoteFiles: "w3c_validation_urls.json", // JSON file contains array of page paths.
            //wrapfile:'local_html_test/wrapper.html',
            relaxerror: ['& did not start a character reference. (& probably should have been escaped as &amp;.)',
                    'A meta element with an http-equiv attribute whose value is X-UA-Compatible must have a content attribute with the value IE=edge.',
                    'Attribute xmlns:fb not allowed here.', 'Attribute with the local name xmlns:fb is not serializable as XML 1.0.'], // We can specify here the list of errors which we want to ignore
            
            generateReport: true,
            errorHTMLRootDir: "w3cErrorFolder",
            useTimeStamp: false,
            errorTemplate: "w3c_validation_error_Template.html"
        },
        files: {
            src: ['local_html_test/*.html']
        }
    });
};