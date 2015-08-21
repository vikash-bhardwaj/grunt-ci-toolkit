/**
 * Page Load Performance Analysis Module
 * 
 * Read More: https://github.com/stefanjudis/grunt-phantomas
 */  

module.exports = function( grunt ) {

    // PHANTOMAS
    // =================================================
    // Task to run performance analysis and generate report of all the performance indices of page load for configured URLs.

    grunt.config("phantomas", {
        performance : {
          options : {
          indexPath : './phantomas/', //Path where the generated HTML report would be created
          options   : {},
          url       : 'http://www.w3schools.com/', // URL which needs to be executed for performance metrics
          buildUi   : true //If report need to be generated in HTML format
        }
      }
    });
};
