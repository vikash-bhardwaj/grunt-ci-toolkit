/**
 * W3C Validation Module
 *
 * Read More: https://github.com/praveenvijayan/grunt-html-validation
 */  

module.exports = function( grunt ) {
    // Task for Validating web pages in against of W3C rules.
    ///grunt.registerTask( "w3cvalidation", "Validate HTML for W3C", function() {

        grunt.config("validation", {
            options: {
                reset: true, //Resets all the validated files status. When want to revalidate all the validated files 
                stoponerror: false, //If this is set to true, validator will stop validating next file
                remotePath: "http://www.smashingmagazine.com/",
                remoteFiles: "w3c_validation_urls.json", // JSON file contains array of page paths.
                relaxerror: ['& did not start a character reference. (& probably should have been escaped as &amp;.)',
                        'A meta element with an http-equiv attribute whose value is X-UA-Compatible must have a content attribute with the value IE=edge.',
                        'Attribute xmlns:fb not allowed here.', 'Attribute with the local name xmlns:fb is not serializable as XML 1.0.'], // We can specify here the list of errors which we want to ignore
                
                generateReport: true,
                errorHTMLRootDir: "w3cErrorFolder",
                useTimeStamp: true,
                errorTemplate: "w3c_validation_error_Template.html"
            },
            files: {
                src: []
            }
        });

        //grunt.task.run("validation");

        /*grunt.config("generateW3CErrorJSON_to_HTML", {
            options: {
                errorHTMLRootDir: "w3cErrorFolder",
                useTimeStamp: true,
                errorTemplate: "error_Template.html"
            }
        });
        // Run the Custom task to generate Error files in HTML format for each given URL.
        grunt.task.run("generateW3CErrorJSON_to_HTML");*/
    //});
};