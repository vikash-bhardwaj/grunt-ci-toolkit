module.exports = function( grunt ) {

    // CONFIGURE MAIN GRUNT
    // =======================================================
    // Here we define the settings for each task.

    grunt.initConfig({

        // this is an object which contains all the information
        // stored in our package.json file. This is useful for
        // preventing duplication of data.

        pkg: grunt.file.readJSON("package.json"),

        // Banner allows us to put a nice banner at top of all our
        // files by including it where necessary.

        bannerCopyright: "Copyright <%= grunt.template.today(\"yyyy\") %>, <%= pkg.author %> // The MIT License (MIT)",

        // PROMPT
        // =================================================
        // This is a quite advanced task created to help anyone
        // new to grunt, it can allow you to select which tasks
        // you would like to run with a UI

        prompt: {
            choose_task: {

                options: {

                    questions: [

                        {
                            config: "tasks",
                            type: "checkbox",
                            message: "Which Grunt tasks would you like to run?",
                            default: "attention",
                            choices: [ 
                                "---",
                                { 
                                    name: "Validate specific Lines of js file       ── Validate specific Lines of a JS file provided by User in prompted text Input",
                                    checked: false,
                                    value: "validatejslines"
                                },
                                { 
                                    name: "Validate Specific js       ── Validate specific JS files provided by User in prompted text Input",
                                    checked: false,
                                    value: "validatejs"
                                },
                                { 
                                    name: "Validate Selected js       ── Validate specific JS files provided by User from provided list",
                                    checked: false,
                                    value: "validateselectedjs"
                                },
                                { 
                                    name: "Validate All js    ── Validate All JS files as configured in JSHINT options",
                                    checked: false,
                                    value: "validatealljs"
                                },
                                { 
                                    name: "W3C Validation       ── Validate specific URLs provided by User for W3C and Generate Report in HTML Format",
                                    checked: false,
                                    value: "validation"
                                },
                                { 
                                    name: "Grunt for dev       ── Run Grunt for Dev tasks",
                                    checked: false,
                                    value: "dev"
                                },
                                { 
                                    name: "Grunt for Prod       ── Run Grunt for Prod tasks",
                                    checked: false,
                                    value: "prod"
                                },
                                "---",
                                { 
                                    name: "Help           ── Show the Grunt tasks available",
                                    checked: false,
                                    value: "attention"
                                }
                            ]
                        }

                    ]

                }

            }
        },

        // ATTENTION
        // =================================================
        // Becuase we don't want anyone to accidentally run a
        // task and overwrite production code, we tell Grunt to
        // display a nice message by default explaining how to
        // use the LC Grunt File.

        attention: {
            no_default: {

                options: {
                    message: 
                        " <%= bannerVersion %> // Gruntfile Automation\n" +
                        " <%= bannerCopyright %>\n\n"  +

                        " There is no default task registered for Grunt.\n" +
                        " Please use one of the following tasks:\n" +
                        " \n" +
                        ".    .                                     \n" +
                        ".    ├──┬─ $ grunt validatealljs           \n" +
                        ".    │  └─ $ grunt validatejs              \n" +
                        ".    │  └─ $ grunt validateselectedjs      \n" +
                        ".    │  └─ $ grunt validatejslines         \n" +
                        ".    │  └─ $ grunt Validation              \n" +
                        ".    │  └─ $ grunt dev                     \n" +
                        ".    │  └─ $ grunt prod                    \n",

                    border: "double",
                    borderColor: "cyan"
                }

            }
        }

    });


    // LOAD TASKS CONFIGURATIONS
    // =======================================================
    // This below command load all the tasks configurations mentioned from JS files under "grunt/options" directory.
    grunt.loadTasks('grunt/options');

    // LOAD TASKS
    // =======================================================
    // This below command load all the tasks mentioned from JS files under "grunt/tasks" directory.
    grunt.loadTasks('grunt/tasks');


    // LOAD TASKS
    // =======================================================
    // Load all of the tasks we will use in our project.
    // these are installed with NPM in the terminal like:
    // $ npm install grunt-contrib-jshint --save-dev

    /**
     * Below Command load all the tasks mentioned in package.json under ['dependencies', 'devDependencies', 'peerDependencies'], provided that the task's package name begins with the grunt- prefix.
     * This command need "load-grunt-tasks" module so make sure you have this mudule installed locally.
     */
    require("load-grunt-tasks")(grunt);
    

    // REGISTER TASKS
    // =======================================================
    // Register the tasks we want to be able to use from
    // our terminal, default task will run with:
    // $ grunt

    // Below is a special task for handling the default prompt command.
    // We take the prompt result and run the corresponding task.

    grunt.registerTask( "task_prompt", "Custom Task to show UI Prompt for running other tasks.", function() {

        var tasks = grunt.config("tasks");
        for( task in tasks ) {
            console.log(tasks);
            var thisTask = tasks[task];
            if( grunt.task.exists( thisTask ) ) {
                grunt.task.run( thisTask );
            }
        }

    });

};