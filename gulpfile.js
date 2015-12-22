const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const Server = require('karma').Server;

const paths = {
  js: __dirname + '/src/js/**/*.js',
  jsEntry: __dirname + '/src/js/luminous.js',
  css: __dirname + '/src/css/**/*.scss'
};

// Fully writing everything out because of this issue:
// https://github.com/karma-runner/gulp-karma/issues/22
// (Basically, it makes for much more reliable test runs)
function runKarmaTests(configFileName, done, singleRun) {
  singleRun = singleRun == null ? true : singleRun;

  var server = new Server({
    configFile: __dirname + configFileName,
    singleRun: singleRun
  });

  server.on('browser_error', function(browser, err) {
    gutil.log('Karma run failed: ' + err.message);
    throw err;
  });

  if (done) {
    server.on('run_complete', function(browsers, results) {
      if (results.failed) {
        throw new Error('Karma tests failed');
      }

      done();
    });
  }

  server.start();
}

gulp.task('default', ['build', 'test-headless']);

gulp.task('build', ['build-js', 'build-css']);
gulp.task('build-ci', ['build', 'test-full']);

gulp.task('test-local', function(done) {
  runKarmaTests('/karma-local.conf.js', done);
});

gulp.task('test-headless', function(done) {
  runKarmaTests('/karma-headless.conf.js', done);
});

gulp.task('test-full', function(done) {
  runKarmaTests('/karma-full.conf.js', done);
});


gulp.task('build-js', function() {
  var b = browserify({
    entries: paths.jsEntry,
    transform: [babelify]
  }).bundle();

  return b.pipe(source('luminous.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('luminous.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-css', function() {

});

gulp.task('watch', function() {
  runKarmaTests('/karma-headless.conf.js', null, false);

  gulp.watch(paths.js, ['build-js']);
  gulp.watch(paths.css, ['build-css']);
});
