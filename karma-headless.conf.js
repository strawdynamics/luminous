// Karma configuration
// Generated on Mon Dec 21 2015 18:27:13 GMT-0800 (PST)

module.exports = function(config) {
  config.set({
    basePath: '',
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine'],
    files: [
      {pattern: 'src/**/*.js', included: false, served: false},
      'test/**/*.js'
    ],
    exclude: [],
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': 'browserify',
      'test/**/*.js': 'browserify',
    },
    browserify: {
      transform: [
        ['babelify', { presets: ['es2015'] }],
      ]
    },
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS',
    ],
    concurrency: Infinity
  })
}
