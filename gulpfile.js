var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var fs = require('node:fs');
const { deepStrictEqual } = require('node:assert');

function buildStyles() {
    return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
}

function watchStyles() {
    gulp.watch('./sass/*.scss', buildStyles);
}

gulp.task('sass', buildStyles);
gulp.task('watch', watchStyles)





