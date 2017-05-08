var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglifyjs');
var cssnano      = require('gulp-cssnano');
var rename       = require('gulp-rename');
var del          = require('del');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var cache        = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('blocks',function() {
    return gulp.src('src/scss/blocks/**/*.css')
        .pipe(concat())
        .pipe(gulp.dest('src/scss/blocks.css'))
});

gulp.task('sass',['blocks'],function() {
    return gulp.src('src/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions','>1%','ie 8','ie 7'],{cascade: true}))
        .pipe(cssnano())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('browser-sync',function() {
    browserSync({
        server:{baseDir: 'http://dev.lomus.ru'},
    });
});
gulp.task('img',function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive:true,
            svgoPlugins:[{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});
gulp.task('watch',['browser-sync'],function() {
    gulp.watch('src/scss/**/*',['sass']);
    gulp.watch('src/js/**/*.js',browserSync.reload);
});
