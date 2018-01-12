var gulp = require('gulp');
var pump = require('pump');
var sass = require('gulp-sass');

gulp.task('img', function (cb) {
	pump([
    gulp.src('src/img/**/*'),
		gulp.dest('dist/img')
	],
		cb
	);
});

gulp.task('sass', function(){
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'))
});

gulp.task('html', function (cb) {
	pump([
		gulp.src('src/*.html'),
		gulp.dest('dist')
	],
		cb
	);
});

gulp.task('build', ['img', 'html', 'sass'], function (cb) {
	pump([
		gulp.src('src/lib/*.js'),
		gulp.dest('dist/js')
	],
		cb
	);
});

gulp.task('stream', ['build'], function (cb) {
	gulp.watch('src/sass/**/*.scss', ['build']);
	gulp.watch('src/lib/*.js', ['build']);
	gulp.watch('src/*.html', ['build']);
});

gulp.task('default', ['stream']);
