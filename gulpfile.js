var gulp = require('gulp');

var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css')
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('lint', function() {
	return gulp.src([ './app/**/*.js', '!./app/bower_components/**' ]).pipe(jshint())
			.pipe(jshint.reporter('default')).pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
	return gulp.src(['./dist/*', './app/js/bundled.js']).pipe(clean({
		force : true
	}));
});

gulp.task('minify-css', function() {
	var opts = {
		comments : true,
		spare : true
	};
	return gulp.src([ './app/**/*.css', '!./app/bower-components/**' ]).pipe(
			minifyCSS(opts)).pipe(gulp.dest('./dist/'));
});

gulp.task('minify-js', function() {
	return gulp.src([ './app/**/*.js', '!./app/bower_components/**' ])
			.pipe(uglify({})).pipe(gulp.dest('./dist/'))
});

gulp.task('copy-bower-components', function() {
	return gulp.src('./app/bower_components/**').pipe(
			gulp.dest('dist/bower_components'));
});

gulp.task('copy-html-files', function() {
	return gulp.src('./app/**/*.html').pipe(gulp.dest('dist/'));
});

gulp.task('browserify', function() {
	return gulp.src(['./app/js/main.js'])
	.pipe(browserify({
		insertGlobals: true,
		debug: true
	}))
	.pipe(concat('bundled.js'))
	.pipe(gulp.dest('./app/js'))
});

gulp.task('browserifyDist', function() {
	return gulp.src(['./app/js/main.js'])
	.pipe(browserify({
		insertGlobals: true,
		debug: true
	}))
	.pipe(concat('bundled.js'))
	.pipe(uglify({}))
	.pipe(gulp.dest('./dist/js'))
});

gulp.task('connect', function() {
	return connect.server({
		root : 'app/',
		port : 8888
	})
});

gulp.task('connectDist', function() {
	return connect.server({
		root : 'dist/',
		port : 9999
	});
});

gulp.task('default', function() {
	runSequence(['clean'], ['lint', 'browserify'], ['connect']);
});

gulp.task('build', function() {
	runSequence(['clean'], ['lint', 'minify-css', 'browserifyDist', 'minify-js', 'copy-html-files', 'copy-bower-components', 'connectDist'])
});