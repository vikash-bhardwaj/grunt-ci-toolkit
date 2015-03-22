/**
 * Grunt Custom Tasks for W3C HTML Validation to generate errors in HTML format.
 */

module.exports = function( grunt ) {
    
    // HELPER METHODS FOR grunt-w3c-validation task to generate the Error in HTML format.
    // =======================================================
    // Helper Methods for html-grunt task for better reusability

    grunt.registerTask("generateW3CErrorJSON_to_HTML", "Generate W3C Error JSON in HTML format", function() {
        // Merge task-specific options with these defaults.
        var options = this.options({
            errorHTMLRootDir: "w3cErrors",
            useTimeStamp: false,
            errorTemplate: "errorTemplate.html"
        });

        var w3cErrorJSON = grunt.file.readJSON("validation-report.json");

        //console.log(JSON.stringify(w3cErrorJSON, null, 4));
        
        // Added Handlebars module to create the HTML report from the template
        var handlebars = require('handlebars');
        
        // Defining Handlerbars template
        if(grunt.file.exists(options.errorTemplate)) {
            var fileTemp = grunt.file.read(options.errorTemplate);
        } else {
            grunt.log.error("Error: Provided Path for HTML Template file '"+ options.errorTemplate + "' is not found.");
            return;
        }
        
        var template = handlebars.compile(fileTemp),
            folderPath = "";

        for(var i=0, len=w3cErrorJSON.length; i<len; i++) {
            var curruntErrorFile = w3cErrorJSON[i];
            
            // Create The Subfolder Name for Error Files.
            if(i === 0) {
                var newDateObj = new Date(),
                    datePortion = (newDateObj.getMonth() + 1) + "-" + newDateObj.getDate() + "-" + newDateObj.getFullYear(),
                    timePortion = newDateObj.toTimeString(),
                    dateFormat;

                timePortion = timePortion.substr(0, timePortion.lastIndexOf(":")).replace(/:/g, "-");
                
                dateFormat = datePortion + "-" + timePortion;
                folderPath = (options.useTimeStamp === true) ? "w3cErrors-"+ dateFormat : "w3cErrors";
            }

            // Skip for Error File Creation if there are no error for current URL.
            if(typeof curruntErrorFile["error"] === "object" && curruntErrorFile["error"].length === 0) {
                continue;
            }

            var filePathTemp = curruntErrorFile["filename"].split("/"),
                filePath;

            filePathTemp = (filePathTemp[filePathTemp.length-1].indexOf(".") === -1) ? filePathTemp.slice(filePathTemp.length-2).join("") : filePathTemp.slice(filePathTemp.length-2).join("").split(".")[0];

            filePath = filePathTemp + "_validation-report" + ".html";

            var errorCompletePath = (/([^\s])/.test(options.errorHTMLRootDir) === false) ? folderPath + "/" + filePath : options.errorHTMLRootDir + "/" + folderPath + "/" + filePath;

            grunt.file.write(errorCompletePath, template(w3cErrorJSON[i]));
            //grunt.file.write(options.reportpath, JSON.stringify(reportArry));
            console.log('Validation report generated: ' + errorCompletePath);
        }

    });
};