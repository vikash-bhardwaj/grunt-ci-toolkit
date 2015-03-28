/**
 * Grunt Custom Tasks for JSHint Task
 */

module.exports = function( grunt ) {

    var tempJSFileName = "";

    // Set the default encoding to UTF8 for all the grunt.file activities.
    grunt.file.defaultEncoding = 'utf8';
    
    // HELPER METHODS FOR JSHINT TASK
    // =======================================================
    // Helper Methods for jshint task for better reusability

    /**
     * @method: getFileLines
     * @param filename: String: JS file path string like - js/foo.js
     * @param line_no_Arr: Array: Array of lines to be returned in format ["5-10", "20-80"]
     * @returns Object: An Object with properties consisted of Line Numbers with that line range String, like below:
            {
                "lines_5-10": "JS Code string of all the lines starting with 5 and ending with 10",
                "lines_20-80": "JS Code string of all the lines starting with 20 and ending with 80",
            }
     */

    function getFileLines(filename, line_no_Arr) {
        console.log("File Name ------    ", filename);

        var fileData = grunt.file.read(filename),
            lines = fileData.split("\n"),
            totalLineAndLineObj = {
                linesObj: {},
                totalLines: lines.length
            },
            lineToStart,
            lineToEnd;

        for(var i =0, len = line_no_Arr.length; i < len; i++) {
            lineToStart = line_no_Arr[i].split("-")[0] - 1;
            lineToEnd = line_no_Arr[i].split("-")[1];
            
            // If Start line number is greater than the last line in file then skip the range.
            if(lineToStart > lines.length) {
                grunt.log.error(("ERROR: Line start provided for range " + (lineToStart + 1) + "-" + lineToEnd + " is greater than the Total number of lines in file.").toString().error);
                continue;
            }

            // If Start line number is greater than the last line number provided then skip the range.
            if((lineToStart + 1) > lineToEnd) {
                grunt.log.error(("ERROR: Line Range provided " + (lineToStart + 1) + "-" + lineToEnd + " has start line number greater than the end line number.").toString().error);
                continue;
            }

            totalLineAndLineObj.linesObj["lines_" + line_no_Arr[i]] = lines.slice(lineToStart, lineToEnd).join("\n");
        }

        return totalLineAndLineObj;
    }

    /**
     * @method: getJsFileNameAndPath
     * @param filePath: String: JS file path string like - js/foo.js js/module/bar.js
     * @returns Object: An Object with properties:
            {
                "fileNameForErrorFile": This will be the JS file name prefixed with current directory name separated by "_",
                "filePathToBeValidated": complete filePath will be sent as it was passed as parameter.
            }
     */

    function getJsFileNameAndPath(filePath, errorFilePrefix) {
        var filePathArr = filePath.split("/"),
            file = filePathArr[filePathArr.length-1],
            fileNameForErrorFile = file.substr(0, file.lastIndexOf(".")),
            filePathToBeValidated = filePath;
        
        //Remove the "."(dot) from the filename so that JSHINT task Key can be created without dot in it.
        if(filePathArr.length > 1) {
            fileNameForErrorFile = filePathArr[filePathArr.length-2] + "_" + fileNameForErrorFile.split(".").join("");
        } else if(errorFilePrefix !== null){
            fileNameForErrorFile = errorFilePrefix + "_" + fileNameForErrorFile.split(".").join("");
        } else {
            fileNameForErrorFile = fileNameForErrorFile.split(".").join("");
        }

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

    function updateJSHintConfig(filePaths, errorFilePrefix) {
        filePaths.forEach(function(filePath) {
            var fileInfo = getJsFileNameAndPath(filePath, (errorFilePrefix || null)),
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
    // Add a new sub task "ask_js_lines" under Prompt Task which will ask JS file names and Line Numbers between which the code will be validated by jshint.

    grunt.config.set("prompt.ask_js_lines.options.questions", [
        {
            config: "jsFileInput",
            type: "input",
            message: "Enter JS File Name along with line numbers separated by space you would like to run with JSHINT? Example:\n" + 
                "js/foo.js 5-29 150-200",
            default: "novalue",
            filter: function(dataValue) {
                return dataValue.split(" ");
            }
        }
    ]);

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
        validatealljs: "Validate all JS files for the rules defined in `.jshintrc` file.",
        validatejs: "Prompt to take JS file names in a Textbox and validate those files with rules defined in `.jshintrc` file.",
        validateselectedjs: "Prompt to take JS file names with Checkboxes and then validate selected files with the rules defined in `.jshintrc` file.",
        task_prompt_js: "Custom Task to show UI Prompt for running other tasks.",
        task_prompt_js_lines: "Custom Task to take JS file name with Line Numbers to validate the provided lines with rules defined in `.jshintrc` file."

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

    // Task for validating single JS file for code between provided two Line Numbers
    grunt.registerTask( "validatejslines", taskDescriptions.validatejs, function() {
        grunt.task.run(["prompt:ask_js_lines", "task_prompt_js_lines"]);       
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

    // Below is a special task for handling the prompt task_prompt_js_lines.
    // We take the JS file name and Line numbers to validate the same to generate the error file.

    grunt.registerTask( "task_prompt_js_lines", taskDescriptions.task_prompt_js_lines, function() {
        
        var userInput = grunt.config("jsFileInput");
        if(userInput.length > 0) {
            var fileName = userInput.slice(0, 1),
                filesToBeValidated = userInput.slice(1),
                dataForJS = "",
                filesSrc = [];
            
            // Log Info if no Line numbers provided for Validation in given JS file.
            if(filesToBeValidated.length <= 0) {
                grunt.log.error("No Line Numbers Provided for validation in provided JS file.".info);
                return true;
            }

            var totalLineAndLineObj = getFileLines(fileName[0], filesToBeValidated),
                codeLinesObj = totalLineAndLineObj.linesObj,
                fileLineSizeArr = new Array(parseInt(totalLineAndLineObj.totalLines));
            
            for(var i=0, len = filesToBeValidated.length; i < len; i++) {
                if(typeof codeLinesObj["lines_" + filesToBeValidated[i]] !== "undefined") {
                    var lineStartNum = parseInt(filesToBeValidated[i].split("-")[0]),
                        lineEndNum = parseInt(filesToBeValidated[i].split("-")[1]),
                        lineNum = 0,
                        currentLinesArr = codeLinesObj["lines_" + filesToBeValidated[i]].split("\n");

                    for(var j= lineStartNum-1; j < lineEndNum; j++) {
                        fileLineSizeArr[j] = currentLinesArr[lineNum];
                        lineNum++;
                    }
                }
            }

            var tempFileName = fileName[0].split("/");

            tempFileName = filesSrc[filesSrc.length] = tempFileName[tempFileName.length-1];

            grunt.file.write(tempFileName, fileLineSizeArr.join("\n"));

            filesSrc = grunt.file.expand(tempFileName);
            
            // Store the temp JS file path if that has to be deleted at later stage.
            tempJSFileName = filesSrc[0];
            
            /** Update the jshint Configurations.
             * passsing "js" as prefix for error HTML file name.
             */
            updateJSHintConfig( filesSrc, "js" );

            // Forces this task jshint to be run forcefully for all the files even if files has errors.
            grunt.option("force",true);

            // Run the grunt "jshint" task manually from code with above set configurations.
            grunt.task.run( ["jshint", "deltetempjsfile"] );
        } else {
            grunt.log.writeln("No Value provided to Validate through jshint");
        }
    });
    
    grunt.registerTask( "deltetempjsfile", "Delete the Temp File created for task_prompt_js_lines task.", function() {
        if(grunt.file.exists(tempJSFileName)) {
            grunt.file.delete(tempJSFileName);
            grunt.log.ok("JS Temp file '" + tempJSFileName + "' successfully deleted.");
        }
    });
};