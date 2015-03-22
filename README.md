# grunt-standard-tasks
Repository to provide Standard Grunt Tasks for a project to support Front-end development.

Code Quality being an integral part of any organisation's front-end development process, each one of developer must follow a standard automated code quality tool. Grunt is one of the globally acknowledged tool that helps controlling code quality by it's task system.

A better development workflow can definitely improve efficiency and quality of projects, this Project has some Grunt task Aliases that will help projects to setup and work with consistent grunt tasks. Focus of this project is to make development workflow capable of capturing code errors while we develop HTMLs, CSS and JS functionalities. W3C testing, Accessibility Testing, JS/CSS Code quality checks are some of highlights of this program. Existing projects should be able to integrate these automation tests like W3C and accessibility on their CI environments and generate the reports in easy HTML formats.

## Getting Started
This package requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may clone this repository and start using various listed below standards grunt tasks for your project.

## Task Aliases

### default
This task will not run any default task rather it is created to help a new developer in team. Running command 'grunt' without any specific task will prompt developer to select grunt tasks from the given list. This task will generate all the available tasks in form of checkbox options configured under "PROMPT" tasks in grunt.js file. User should be able to select and run any of the grunt task by hitting "space" key to select and "return" key to run the selected tasks.

```shell
? Which Grunt tasks would you like to run? 
 ──────────────
 ◯ Validate All js    ── Validate All JS files as configured in Gruntfile
 ◯ Validate Specific js       ── Validate specific JS files provided by User as text Input
 ◯ Validate Selected js       ── Validate specific JS files provided by User from provided list
 ◯ W3C Validation       ── Validate specific URLs provided by User for W3C and Generate Report in HTML Format
 ◯ Grunt for dev       ── Run Grunt for Dev tasks
 ◯ Grunt for Prod       ── Run Grunt for Prod tasks
 ──────────────
❯◯ Help           ── Show the Grunt tasks available
```