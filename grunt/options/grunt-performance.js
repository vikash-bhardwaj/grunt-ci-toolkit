/**
 * Page Performance Metrics Module
 */  

module.exports = function( grunt ) {

    // Performance Analysis of Page
    // =================================================
    // Task to run performance analysis and generate report of all the performance indices of page load for configured URLs.

    grunt.config("performancemetrics", {
        gruntSite : {
          options : {
          indexPath : './phantomas/', //Path where the generated HTML report would be created
          options   : {},
          url       : 'http://www.w3schools.com/', // URL which needs to be executed for performance metrics
          buildUi   : true //If report need to be generated in HTML format
        }
      }
    });
};
