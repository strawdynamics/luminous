// Karma configuration
// Generated on Mon Dec 21 2015 18:27:13 GMT-0800 (PST)

module.exports = function(config) {
  config.set({
    basePath: '',
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    files: [
      'dist/luminous.js',
      'test/**/*.js'
    ],
    exclude: [],
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js': 'babel'
    },
    babelPreprocessor: {
        options: {
            presets: ['es2015']
        }
    },
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'saucelabs'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [
      'sl_chrome',
      'sl_safari_9',
      'sl_safari_8',
      'sl_firefox_42',
      'sl_firefox_41',
      'sl_ie_11',
      'sl_ie_10',
      'sl_ios_9',
      'sl_ios_8',
      'sl_android_5',
      'sl_android_4'
    ],
    concurrency: Infinity,
    sauceLabs: {
        testName: 'Luminous Tests'
    },
    customLaunchers: {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'Chrome'
        },
        sl_safari_9: {
            base: 'SauceLabs',
            browserName: 'Safari',
            version: 9
        },
        sl_safari_8: {
            base: 'SauceLabs',
            browserName: 'Safari',
            version: 8
        },
        sl_firefox_42: {
            base: 'SauceLabs',
            browserName: 'Firefox',
            version: 42
        },
        sl_firefox_41: {
            base: 'SauceLabs',
            browserName: 'Firefox',
            version: 41
        },
        sl_ie_11: {
            base: 'SauceLabs',
            browserName: 'Internet Explorer',
            version: '11'
        },
        sl_ie_10: {
            base: 'SauceLabs',
            browserName: 'Internet Explorer',
            version: '10'
        },
        sl_ios_9: {
            base: 'SauceLabs',
            browserName: 'iPhone',
            version: '9.2'
        },
        sl_ios_8: {
            base: 'SauceLabs',
            browserName: 'iPhone',
            version: '8.4'
        },
        sl_android_5: {
            base: 'SauceLabs',
            browserName: 'Android',
            version: '5.1'
        },
        sl_android_4: {
            base: 'SauceLabs',
            browserName: 'Android',
            version: '4.4'
        }
    }
  })
}
