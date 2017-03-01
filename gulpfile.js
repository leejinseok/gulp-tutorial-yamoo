var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	del = require('del');

// 순차적으로 task 실행
gulp.task('scripts', ['js:hint', 'js:concat', 'js:uglify']);

var path = {
	js: {
		src: 'src/*.js',
		dest: 'dist/',
		filename: 'combine.js'
	}
}

gulp.task('clean', function(){
	del(['dist/*', '!dist/no-remove.js']);
})

// 문법검사
gulp.task('js:hint', function(){
	gulp.src(path.js.src)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
})

// 병합
gulp.task('js:concat', function(){
	gulp.src(path.js.src)
		.pipe(concat(path.js.filename))
		.pipe(gulp.dest(path.js.dest));
})

// 압축
gulp.task('js:uglify', function(){
	gulp.src(path.js.dest+path.js.filename)
		.pipe(uglify())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest(path.js.dest));
})
