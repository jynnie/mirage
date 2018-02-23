var gulp = require('gulp');
var pump = require('pump');
var sass = require('gulp-sass');
var pug = require('gulp-pug');

gulp.task('img', function (cb) {
	pump([
    gulp.src('src/img/**/*'),
		gulp.dest('dist/img')
	],
		cb
	);
});

gulp.task('sass', function(){
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'))
});

gulp.task('pug', function buildHTML() {
	return gulp.src('src/*.pug')
	  .pipe(pug())
		.pipe(gulp.dest('dist'))
});

gulp.task('html', function (cb) {
	pump([
		gulp.src('src/*.html'),
		gulp.dest('dist')
	],
		cb
	);
});

gulp.task('build', ['img', 'html', 'sass', 'pug'], function (cb) {
	pump([
		gulp.src('src/lib/*.js'),
		gulp.dest('dist/js')
	],
		cb
	);
});

gulp.task('stream', ['build'], function (cb) {
	gulp.watch('src/scss/**/*.scss', ['build']);
	gulp.watch('src/lib/*.js', ['build']);
	gulp.watch('src/*.html', ['build']);
	gulp.watch('src/*.pug', ['build']);
});

gulp.task('default', ['stream']);
