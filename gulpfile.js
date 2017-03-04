var gulp = require('gulp'),
	csslint = require('gulp-csslint'),
	concatcss = require('gulp-concat-css'),
	uglifycss = require('gulp-uglifycss'),

	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	gulpif = require('gulp-if'),
	del = require('del'),
	config = require('./config.json');

// 순차적으로 task 실행
gulp.task('scripts', ['js:hint', 'js:concat', 'js:uglify']);
gulp.task('default', ['clean', 'styles', 'scripts']);



gulp.task('clean', function(){
	del(['dist/*', '!dist/no-remove.js']);
})

gulp.task('watch', ['clean'], function(){
	gulp.watch(config.path.css.src, ['styles']);
	gulp.watch(config.path.js.src, ['scripts']);
})

gulp.task('watch:all', ['clean'], function(){
	gulp.watch('src/css/*.css', ['styles']);
})

// 문법검사
gulp.task('js:hint', function(){
	gulp.src(config.path.js.src)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
})

// 병합
gulp.task('js:concat', function(){
	gulp.src(config.path.js.src)
		.pipe(concat(config.path.js.filename))
		.pipe(gulp.dest(config.path.js.dest));
})

// 압축
gulp.task('js:uglify', function(){
	gulp.src(config.path.js.dest+config.path.js.filename)
		.pipe(uglify())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest(config.path.js.dest));
})

//css
gulp.task('styles', function(){
	gulp.src(config.path.css.src)
		//문법검사
		.pipe( gulpif(config.lint, csslint({'import':false})) )
		.pipe( gulpif(config.lint, csslint.formatter()) )

		//압축하지 않은파일
		.pipe( gulpif(config.concat, concatcss(config.path.css.filename)) )
		.pipe(gulp.dest(config.path.css.dest))

		//압축파일
		.pipe( gulpif(config.uglify, uglifycss()) )
		.pipe( gulpif(config.rename, rename({suffix:'.min'})) )
		.pipe(gulp.dest(config.path.css.dest));
})
