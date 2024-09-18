const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')

gulp.task('server',  function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('styles', function () {
    return gulp.src("sass/*.+(scss|sass|css)")
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});


gulp.task('watch', function () {
    gulp.watch('*.html').on('change', browserSync.reload)
    gulp.watch('sass/*.+(scss|sass|css)', gulp.parallel('styles'))
    gulp.watch('sass/**/*.+(scss|sass|css)', gulp.parallel('styles'))
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));