/**
 * Page Load Performance Analysis Module
 */  

module.exports = function( grunt ) {

    // Site Speed and Performance Analysis of Page
    // =================================================
    // Task to run Analyze about website speed and performance.
    grunt.config("sitespeedio", {
        default: {
          options: {
            urls: ['http://www.google.com', 'http://www.apple.com'],
            resultBaseDir: './siteSpeedReport/'
          }
        }
    });
};
