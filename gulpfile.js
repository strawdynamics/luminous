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
const runSequence = require('run-sequence');
const karmaConfig = require('./karmaConfig');
const Config = require('karma/lib/config').Config;

const paths = {
  js: __dirname + '/src/js/**/*.js',
  jsEntry: __dirname + '/src/js/luminous.js',
  css: __dirname + '/src/css/**/*.scss'
};

function runKarmaTests(configObj, done, singleRun) {
  var config = new Config();
  config.set(configObj);

  new Server(config, function(exitCode) {
    if (exitCode !== 0) {
      throw new gutil.PluginError('Karma tests failed');
    }

    done();
  }).start();
}

gulp.task('default', ['build', 'test-headless']);

gulp.task('build', ['build-js', 'build-css']);
// When actually setting up CI stuff, this will need to run in sequence.
// https://www.npmjs.com/package/run-sequence
gulp.task('build-ci', ['build', 'test-full']);

gulp.task('test-local', function(done) {
  runKarmaTests(karmaConfig.local, done);
});

gulp.task('test-headless', function(done) {
  runKarmaTests(karmaConfig.headless, done);
});

gulp.task('test-full', function(done) {
  runKarmaTests(karmaConfig.full, done);
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
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-css', function() {

});

gulp.task('watch', function() {
  gulp.watch(paths.js, function() {
    runSequence(['build-js', 'test-headless']);
  });
  gulp.watch(paths.css, ['build-css']);
});
