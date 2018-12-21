const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
// const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

gulp.task('css', () =>
    gulp.src(['./src/css/base/reset.css',
            './src/css/base/default.css',
            './src/css/*.css'])
      .pipe(minifyCss())
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('dist/css'))
);

gulp.task('fonts', () =>
  gulp.src('./src/assets/fonts/**')
    .pipe(gulp.dest('dist/assets/fonts'))
);

gulp.task('imagemin', () =>
  gulp.src('./src/assets/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/images'))
);

gulp.task('js', ()=>
    gulp.src('src/js/**/*.js')
      .pipe(gulp.dest('dist/js'))
);

gulp.task('watch', () => {
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('build', ['css', 'js', 'fonts', 'imagemin']);
gulp.task('dev', ['build', 'watch']);
