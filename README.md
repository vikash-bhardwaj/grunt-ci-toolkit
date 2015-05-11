# grunt-standard-tasks
Repository to provide Standard Grunt Tasks for a project to support Front-end development.

**Code Quality** being an integral part of any organisation's front-end development process, each one of developer must follow a standard automated code quality tool. Grunt is one of the globally acknowledged tool that helps controlling code quality by it's task system.

A better development workflow can definitely improve efficiency and quality of projects, this Project has some Grunt task Aliases that will help projects to setup and work with consistent grunt tasks. Focus of this project is to make development workflow capable of capturing code errors while we develop HTMLs, CSS and JS functionalities. W3C testing, Accessibility Testing, JS/CSS Code quality checks are some of highlights of this program. Existing projects should be able to integrate these automation tests like W3C and accessibility on their CI environments and generate the reports in easy HTML formats.

## Getting Started
This package requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may clone this repository and start using various listed below standards grunt tasks for your project.

After downloading and unzipping the folder, navigate to its root directory in command prompt and run this command:

```shell
	npm install
```
This will install all the dependencies and plugins required to configure the grunt tasks. 

## Task Aliases

### default
This task will not run any default task rather it is created to help a new developer in team. Running default task using command 'grunt' will prompt developer to select grunt tasks from the available tasks in gievn project. This task will generate all the available tasks in form of checkbox options configured under "PROMPT" tasks in Gruntfile.js file. User should be able to select and run any of the grunt task by hitting "space" key to select and "return" key to run the selected tasks.

Note: Any New Task or Alias should be updated in Gruntfile.js under "PROMPT" task.

```shell
? Which Grunt tasks would you like to run? 
 ──────────────
 ◯ Validate specific Lines of js file       ── Validate specific Lines of a JS file provided by User in prompted text Input
 ◯ Validate Specific js       ── Validate specific JS files provided by User as text Input
 ◯ Validate Selected js       ── Validate specific JS files provided by User from provided list
 ◯ Validate All js    ── Validate All JS files as configured in Gruntfile
 ◯ W3C Validation       ── Validate specific URLs provided by User for W3C and Generate Report in HTML Format
 ◯ Performance Metrices ── Run grunt for Performance metrices
 ◯ SiteSpeed Stats      ── Run grunt to analyze website speed and performance
 ◯ Grunt for dev       ── Run Grunt for Dev tasks
 ◯ Grunt for Prod       ── Run Grunt for Prod tasks
 ──────────────
❯◯ Help           ── Show the Grunt tasks available
```


### validatejslines
Running 'validatejslines' task by `grunt validatejslines` command or by selecting option `Validate specific Lines of js file` from above mentioned default 'grunt' task will validate only Lines of Code for provided one JS file in prompted Input Textbox with rules mentioned in '.jshintrc' file. This task will Prompt developer to provide JS file name with relative path to your root directory followed by line ranges to be validated.

For example you have a js file with path 'js/test.js' and you want to validate lines 1-5 and 15-18 from this file then provide below data into prompted textbox. You can provide as many as line ranges separated by a space.

```shell
  js/test.js 1-5 15-18
```


### validatejs
Running 'validatejs' task by `grunt validatejs` command or by selecting option `Validate Specific js` from above mentioned default 'grunt' task will validate only JS files provided in prompted Input Textbox with rules mentioned in '.jshintrc' file. This task will Prompt developer to provide JS file names with relative path to your root directory in a Textbox and then same will be validated to generate the report.

For example if you want to validate multiple js files then provide those JS file names in below format. Please note that file names should be provided with relative path to your root directory and multiple file names should be provided separated by space.

```shell
  js/test.js js/test1.js js/test2.js js/test3.js
```


### validateselectedjs
Running 'validateselectedjs' task by `grunt validateselectedjs` command or by selecting option `Validate Selected js` from above mentioned default 'grunt' task will validate only JS files selected by user from a list of JS files with rules mentioned in '.jshintrc' file. This task will Prompt developer to select JS file names in form of Checkbxes and files list will be generated by files configured in JSHINT option with variable '<b>jsFilesToBeValidated</b>'. Selection of files can be made by Space 'key' and then can be run by 'return' key.


### validatealljs
Running 'validatealljs' task by `grunt validatealljs` command or by selecting option `Validate All js` from above mentioned default 'grunt' task will validate all the JS files with rules mentioned in '.jshintrc' file. This will validate all the JS files configured in JSHINT task option with variable '<b>jsFilesToBeValidated</b>'.

**Important:**
 - For all the above Tasks related to JS Validation(`validatejslines, validatejs, validateselectedjs, validatealljs`) please refer to original Plug-in [grunt-jshint-extended](https://www.npmjs.com/package/grunt-jshint-extended){:target="_blank"}
 - For other standard JSHINT options please refer to [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint){:target="_blank"}


### validation
Running 'validation' task by `grunt validation` command or by selecting from grunt options will validate all the configured URLs for W3C and generate the report.

**Note:** For detailed options please refer the original plug-in [grunt-w3c-html-validation](https://www.npmjs.com/package/grunt-w3c-html-validation)


### phantomas
Run 'phantomas' task by selecting from the grunt options to generate performance analysis report of your web page.

This task could also be run directly from command prompt using :

```shell
	grunt phantomas
```
**Note:** For other standard phantomas options please refer to https://www.npmjs.com/package/grunt-phantomas


### sitespeedio
Run 'sitespeedio' task by selecting from the grunt options to generate page load performance analysis report of your web pages.

This task could also be run directly from command prompt using :

```shell
	grunt sitespeedio
```
**Note:** For other standard sitespeedio options please refer to https://www.npmjs.com/package/grunt-sitespeedio


### dev
Running 'dev' task by `grunt dev` command or by selecting from grunt options will run below tasks in defined order:
		"validatealljs",
    	"concat",
    	"cssmin",
    	"validation"


### prod
Running 'prod' task by `grunt prod` command or by selecting from grunt options will run below tasks in defined order:
		"validatealljs",
    	"concat",
    	"cssmin",
    	"uglify",
    	"validation"


### help
Running 'help' task by `grunt attention` command or by selecting from grunt options will show the available grunt commands/tasks on screen for new developers help. This will be similar to:

```shell
  ╔═════════════════════════════════════════════════════════════════════════╗
  ║                                                                         ║
  ║  // Gruntfile Automation                                                ║
  ║  Copyright 2015, Vikash Bhardwaj <vikasbhardwaj7@gmail.com> // The      ║
  ║  MIT License (MIT)                                                      ║
  ║                                                                         ║
  ║  There is no default task registered for Grunt.                         ║
  ║  Please use one of the following tasks:                                 ║
  ║                                                                         ║
  ║  .    .                                                                 ║
  ║  .    ├──┬─ $ grunt validatejslines                                     ║
  ║  .    │  └─ $ grunt validatejs                                          ║
  ║  .    │  └─ $ grunt validateselectedjs                                  ║
  ║  .    │  └─ $ grunt validatealljs                                       ║
  ║  .    │  └─ $ grunt validation                                          ║
  ║  .    │  └─ $ grunt phantomas                                           ║
  ║  .    │  └─ $ grunt sitespeedio                                         ║
  ║  .    │  └─ $ grunt dev                                                 ║
  ║  .    │  └─ $ grunt prod                                                ║
  ║  .    │  └─ $ grunt attention                                           ║
  ║                                                                         ║
  ╚═════════════════════════════════════════════════════════════════════════╝

```
