let gulp = require('gulp');
let concat = require('gulp-concat');
let minifyCss = require('gulp-minify-css');
let uglify = require('gulp-uglify');

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

gulp.task('uglify', ()=>
    gulp.src('src/js/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
);

gulp.task('watch', () => {
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/js/**/*.js', ['uglify']);
});

gulp.task('build', ['css', 'uglify', 'fonts']);
gulp.task('dev', ['build', 'watch']);
