let gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    prefix = require('gulp-autoprefixer')

gulp.task('default', () => {
    gulp.watch('./docs/**/*.scss', ['css-deal'])
})

gulp.task('css-deal', () => {
    gulp.src('./docs/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(csso())
        .pipe(prefix({
            browsers: ['last 1 version']
        }))
        .pipe(gulp.dest('./docs/dist'))
})