const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const babel = require('gulp-babel');
const minifyJS = require('gulp-uglifyjs');
const minifyCSS = require('gulp-clean-css');
const minifyHTML = require('gulp-cleanhtml');
const replace = require('gulp-replace');
const embedTemplates = require('gulp-angular-embed-templates');

gulp.task('default', ['less', 'js', 'html']);

gulp.task('watch', () => {
	gulp.watch('./app/client/src/**/*.js', ['js']);
	gulp.watch('./app/client/src/**/*.less', ['less']);
	gulp.watch('./app/client/**/*.html', ['html']);
});

gulp.task('less', () => {
	return gulp.src('./app/client/src/styles/styles.less')
						.pipe(less({
							paths: [path.join(__dirname, 'less', 'includes')]
						}))
						.pipe(minifyCSS())
						.pipe(gulp.dest('./app/client/build/styles/'));
});

gulp.task('js', () => {
	return gulp.src(['./app/client/src/scripts/app.js', './app/client/src/scripts/**/*.js'])
						.pipe(embedTemplates({
							minimize: {empty: true}
						}))
						.pipe(replace(/\>[\s]+\</g, '><'))
						.pipe(concat('app.js'))
						.pipe(babel({
							presets: ['es2015', 'es2016']
						}))
						.pipe(minifyJS())
						.pipe(gulp.dest('./app/client/build/scripts/'));
});

gulp.task('html', () => {
	return gulp.src('./app/client/src/index.html')
						.pipe(minifyHTML())
						.pipe(gulp.dest('./app/client/build/'))
});
