var gulp = require('gulp');

var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css')
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var karma = require('gulp-karma');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-htmlmin");

var moduleName = "SampleApp";

gulp.task('lint', function() {
	return gulp.src([ './app/**/*.js', '!./app/bower_components/**', '!./app/js/bundled*.js' ]).pipe(jshint())
			.pipe(jshint.reporter('default')).pipe(jshint.reporter('fail'));
});

gulp.task('clean', function() {
	return gulp.src(['./dist/*', './app/js/bundled.js']).pipe(clean({
		force : true
	}));
});

gulp.task('less', function()  {
	return gulp.src('./app/css/*.less')
	.pipe(less())
	.pipe(gulp.dest('./app/css'));
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
			.pipe(sourcemaps.init())
			.pipe(uglify({}))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('./dist/'))
});

gulp.task('minify-html', function() {
	return gulp.src('./app/js/directive/template/*.html')
	.pipe(minifyHtml({
		collapseWhitespace: true
	}))
	.pipe(ngHtml2Js({
		moduleName: moduleName,
		prefix: "template/"
	}))
	.pipe(concat('bundled-template.js'))
	.pipe(gulp.dest("./app/js"));
});

gulp.task('minify-html-dist', function() {
	return gulp.src('./app/js/directive/template/*.html')
	.pipe(minifyHtml({
		collapseWhitespace: true
	}))
	.pipe(ngHtml2Js({
		moduleName: moduleName,
		prefix: "template/"
	}))
	.pipe(uglify({}))
	.pipe(concat('bundled-template.js'))
	.pipe(gulp.dest("./dist/js"));
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
		options: {
			browserifyOptions: {
				debug: false
			}
		}
	}))
	.pipe(concat('bundled.js'))
	.pipe(gulp.dest('./app/js'))
});

gulp.task('browserifyDist', function() {
	return gulp.src(['./app/js/main.js'])
	.pipe(browserify({
		insertGlobals: true,
		options: {
			browserifyOptions: {
				debug: false
			}
		}
	}))
	.pipe(concat('bundled.js'))
	.pipe(uglify({}))
	.pipe(gulp.dest('./dist/js'))
});

gulp.task('connect', function() {
	connect.server({
		root : 'app/',
		port : 8888
	})
});

gulp.task('connectDist', function() {
	connect.server({
		root : 'dist/',
		port : 9999
	});
});

gulp.task('watch', ['default'], function() {
	gulp.watch(['./app/js/**/*.js', '!./app/js/bundled.js'], function() {
		runSequence(['clean'], ['lint', 'browserify', 'test']);
	});
	gulp.watch(['./app/css/*.less'], function() {
		runSequence(['less']);
	});
});

gulp.task('test', function() {
	return gulp.src('./fake')
	.pipe(karma({
		configFile: 'karma.conf.js',
		action: 'run'
	}))
	.on('error', function(err) {
		console.log(err);
		this.emit('end');
	})
});

gulp.task('default', function() {
	runSequence(['clean'], ['less', 'lint', 'browserify', 'minify-html'], ['connect']);
});

gulp.task('build', function() {
	runSequence(['clean'], ['less', 'lint', 'minify-css', 'browserifyDist', 'minify-js', 'minify-html-dist', 'copy-html-files', 'copy-bower-components', 'connectDist'])
});