/**
 * Grunt Custom Tasks for JSHint Task
 */

module.exports = function( grunt ) {
    
    // HELPER METHODS FOR JSHINT TASK
    // =======================================================
    // Helper Methods for jshint task for better reusability

    /**
     * @method: getJsFileNameAndPath
     * @param filePath: String: JS file path string like - js/foo.js js/module/bar.js
     * @returns Object: An Object with properties:
            {
                "fileNameForErrorFile": This will be the JS file name prefixed with current directory name separated by "_",
                "filePathToBeValidated": complete filePath will be sent as it was passed as parameter.
            }
     */

    function getJsFileNameAndPath(filePath) {
        var filePathArr = filePath.split("/"),
            file = filePathArr[filePathArr.length-1],
            fileNameForErrorFile = file.substr(0, file.lastIndexOf(".")),
            filePathToBeValidated = filePath;
        
        //Remove the "."(dot) from the filename so that JSHINT task Key can be created without dot in it.
        fileNameForErrorFile = filePathArr[filePathArr.length-2] + "_" + fileNameForErrorFile.split(".").join("");

        return {
            "fileNameForErrorFile": fileNameForErrorFile,
            "filePathToBeValidated": filePathToBeValidated
        };
    }

    /**
     * @method: updateJSHintConfig
     * @param filePaths: Array: Array contaiing JS file names like - ["js/foo.js", "js/module/bar.js"]
     * @returns None
       @useCase:
       ** This Method is used to create the multiple dynamic subtasks under "jshint" task.
       ** Each subtask gets updated for "reporterOutput" option and src attribute.
       ** Detailed description is given inside the function.
     */

    function updateJSHintConfig(filePaths) {
        filePaths.forEach(function(filePath) {
            var fileInfo = getJsFileNameAndPath(filePath),
                fileNameForErrorFile = fileInfo.fileNameForErrorFile;

            //grunt.log.writeln(fileNameForErrorFile);

            /**
             * Set the jshint subtask option for error report html file name to be generated.
             * This gets resolved something similar to an inline definition of jshint subtask like below:
                    jshint: {
                        cart: { // fileNameForErrorFile is going to be resolved as some value like "cart"
                            options: {
                                reporterOutput: "js/errors/cart.html");
                            }
                        }
                    }
             */

            grunt.config.set("jshint."+fileNameForErrorFile+".options.reporterOutput", grunt.config("jsErrorFilesPath") + fileNameForErrorFile+".html");

            /**
             * Set the src key for the the jshint subtask to contain the file names to be validated.
             * This below code line along with above line gets resolved something similar to an inline definition of jshint subtask like below:
                    jshint: {
                        cart: { // fileNameForErrorFile is going to be resolved as some value like "cart"
                            options: {
                                reporterOutput: "js/errors/cart.html");
                            },
                            src: ["js/cart.js"] //filePathToBeValidated is going to be resolved as some value like "js/cart.js"
                        }
                    }
             */
            grunt.config.set("jshint."+fileNameForErrorFile+".src", [fileInfo.filePathToBeValidated]);
        });
    }

    // Extend Prompt Task for 
    // =================================================
    // Add a new sub task "ask_js_name" under Prompt Task which will ask JS file names that can be validated by jshint.

    grunt.config.set("prompt.ask_js_name.options.questions", [
        {
            config: "jsFileInput",
            type: "input",
            message: "Enter JS File Names along with path separated by space you would like to run? Example:\n" + 
                "js/foo.js js/modules/bar.js",
            default: "novalue",
            filter: function(dataValue) {
                return dataValue.split(" ");
            }
        }
    ]);
    

    // REGISTER COSTOM TASKS FOR JSHINT
    // =======================================================
    // Register the tasks we want to be able to use from
    // our terminal for jshint, validatealljs task will run with:
    // $ grunt validatealljs

    var taskDescriptions = {
        validatealljs: "Validate BBB all JS files for the rules defined in `.jshintrc` file.",
        validatejs: "Validate the JS files by taking input from developer through textbox, files netered by developer as input will be validate with rules defined in `.jshintrc` file.",
        validateselectedjs: "Prompt to take JS file names with Checkboxes and then validate selected files with the rules defined in `.jshintrc` file.",
        task_prompt_js: "Custom Task to show UI Prompt for running other tasks."

    };

    // Task for validating single JS file using "grunt validatejs" command.
    grunt.registerTask( "validatejs", taskDescriptions.validatejs, function() {
        grunt.task.run(["prompt:ask_js_name", "task_prompt_js"]);       
    });

    // Task for validating single JS file using "grunt validateselectedjs" command.
    grunt.registerTask( "validateselectedjs", taskDescriptions.validateselectedjs, function() {
        var filePaths = grunt.file.expand(grunt.config("jsFilesToBeValidated")),
            fileInfo,
            fileChoices = [];

        // Create a Choices array for Prompt task "select_js_names"
        filePaths.forEach(function(filePath) {
            fileInfo = getJsFileNameAndPath(filePath);
            fileChoices.push({
                name: fileInfo.fileNameForErrorFile,
                checked: false,
                value: fileInfo.filePathToBeValidated
            });

        });

        /** Add a new sub task "select_js_names" under Prompt Task which will provide list of all JS files that can be validated by jshint.
         * This list of JS files is configured in grunt config with property "jsFilesToBeValidated".
         */
        grunt.config.set("prompt.select_js_names.options.questions", [
            {
                config: "jsFileInput",
                type: "checkbox",
                message: "Select JS File Names you would like to validate?",
                default: "novalue",
                choices: fileChoices
            }

        ]);
        

        grunt.task.run(["prompt:select_js_names", "task_prompt_js"]);
    });

    // Task for validating all the JS files using "grunt validatealljs" command.
    grunt.registerTask( "validatealljs", taskDescriptions.validatealljs, function() {
        var filesSrc = grunt.file.expand(grunt.config("jsFilesToBeValidated"));

        // Update the jshint Configurations.
        updateJSHintConfig( filesSrc );
        
        // Forces this task jshint to be run forcefully for all the files even if files has errors.
        grunt.option("force",true);

        // Run the grunt "jshint" task manually from code with above set configurations.
        grunt.task.run( "jshint" );
    });

    

    // Below is a special task for handling the prompt task_prompt_js.
    // We take the JS file name and validate the same to generate the error file.

    grunt.registerTask( "task_prompt_js", taskDescriptions.task_prompt_js, function() {
        
        var filesSrc = grunt.file.expand(grunt.config("jsFileInput"));
        
        if(filesSrc.length > 0) {
            // Update the jshint Configurations.
            updateJSHintConfig( filesSrc );

            // Forces this task jshint to be run forcefully for all the files even if files has errors.
            grunt.option("force",true);

            // Run the grunt "jshint" task manually from code with above set configurations.
            grunt.task.run( "jshint" );
        } else {
            grunt.log.writeln("No Value provided to Validate through jshint");
        }
    });
};