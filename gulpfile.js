var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var runSequence = require('run-sequence').use(gulp);
/*START:To create css files from less*/
gulp.task('less', function() {
        return gulp.src('./css/*.less')
            .pipe(less({
                paths: [path.join(__dirname, 'less', 'includes')]
            }))
            .pipe(gulp.dest('./public/css'));
    })
    /*END:To create css files from less*/
gulp.task('watch', function() {
        gulp.watch('./css/*.less', function() { runSequence('less', 'minify') })
    })
    /*START:To minify css files*/
gulp.task('minify', function() {
    return gulp.src('./public/css/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'));
});
/*END:To minify css files*/
/*START:Default Task*/
gulp.task('default', function() {
        runSequence('watch', 'less', 'minify')
    })
    /*END:Default Task*/