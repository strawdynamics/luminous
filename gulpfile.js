var gulp = require('gulp'),
	Server = require('karma').Server;

gulp.task('default', function() {

});

gulp.task('test-local', function(done) {
	new Server({
		configFile: __dirname + '/karma-local.conf.js'
	}, done).start();
});

gulp.task('test-full', function(done) {
	new Server({
		configFile: __dirname + '/karma-full.conf.js'
	}, done).start();
});
