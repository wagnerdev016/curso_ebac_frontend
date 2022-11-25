const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

function comprimeJavaScript() {
    gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'))
};

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourceMaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
};

function comprimeImagem() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
};

exports.sass = compilaSass;
exports.js = comprimeJavaScript;
exports.imagemin = comprimeImagem;

exports.default = function() {
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false}, gulp.series(comprimeJavaScript))
    gulp.watch('./source/styles/main.scss', { ignoreInitial: false}, gulp.series(compilaSass))
    gulp.watch('./source/images/*', { ignoreInitial: false}, gulp.series(comprimeImagem))
};