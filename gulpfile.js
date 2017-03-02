var gulp = require('gulp'),
	csslint = require('gulp-csslint'),
	concatcss = require('gulp-concat-css'),
	uglifycss = require('gulp-uglifycss'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	del = require('del');

// 순차적으로 task 실행
gulp.task('scripts', ['js:hint', 'js:concat', 'js:uglify']);

var path = {
	js: {
		src: 'src/js/*.js',
		dest: 'dist/',
		filename: 'combine.js'
	},
	css:{
		src: "src/css/style.css",
		dest:'dist/css/',
		filename:'style.css'
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

gulp.task('styles', function(){
	gulp.src(path.css.src)
		//문법검사
		.pipe(csslint({'import':false}))
		.pipe(csslint.formatter())

		//압축하지 않은파일
		.pipe(concatcss(path.css.filename))
		.pipe(gulp.dest(path.css.dest))

		//압축파일
		.pipe(uglifycss())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest(path.css.dest))
})
