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
                                    name: "Validate specific lines of JavaScript file",
                                    checked: false,
                                    value: "validatejslines"
                                },
                                { 
                                    name: "Validate specific JavaScript",
                                    checked: false,
                                    value: "validatejs"
                                },
                                { 
                                    name: "Validate selected JavaScript",
                                    checked: false,
                                    value: "validateselectedjs"
                                },
                                { 
                                    name: "Validate all JavaScripts",
                                    checked: false,
                                    value: "validatealljs"
                                },
                                { 
                                    name: "W3C validation",
                                    checked: false,
                                    value: "validation"
                                },
                                {
                                    name:"Performance metrics",
                                    checked:false,
                                    value:"phantomas"
                                }, 
                                {
                                    name:"SiteSpeed stats",
                                    checked:false,
                                    value:"sitespeedio"
                                },
                                {
                                    name:"PhotoBox creative QA",
                                    checked:false,
                                    value:"photobox"
                                },
                                { 
                                    name: "Grunt for development",
                                    checked: false,
                                    value: "dev"
                                },
                                { 
                                    name: "Grunt for production",
                                    checked: false,
                                    value: "prod"
                                },
                                "---",
                                { 
                                    name: "Help",
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
                        ".    ├──┬─ $ grunt validatejslines         // Validate specific lines of a JS file provided by user in prompted text input.\n" +
                        ".    │  └─ $ grunt validatejs              // Validate specific JS files provided by user as text input.\n" +
                        ".    │  └─ $ grunt validateselectedjs      // Validate specific JS files provided by user from provided list.\n" +
                        ".    │  └─ $ grunt validatealljs           // Validate all JS files as configured in Gruntfile.js.\n" +
                        ".    │  └─ $ grunt Validation              // Validate specific URLs provided by user for W3C and generate report in HTML format.\n" +
                        ".    │  └─ $ grunt phantomas               // Run grunt for performance metrices.\n" +
                        ".    │  └─ $ grunt sitespeedio             // Run grunt to analyze website speed and performance.\n" +
                        ".    │  └─ $ grunt photobox                // Prevent your project of broken layout via screenshot photo sessions of your site.\n" +
                        ".    │  └─ $ grunt dev                     // Run grunt for `dev` tasks\n" +
                        ".    │  └─ $ grunt prod                    // Run grunt for `pro` tasks\n" +
                        ".    │  └─ $ grunt attention               // Open me again :)\n",

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
