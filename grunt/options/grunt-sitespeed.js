/**
 * Page Load Performance Analysis Module
 * 
 * Read More: https://github.com/sitespeedio/grunt-sitespeedio
 */  

module.exports = function( grunt ) {

    // SITESPEEDIO
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
