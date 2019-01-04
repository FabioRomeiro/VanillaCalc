const gulp = require('gulp');
const usemin = require('gulp-usemin');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const jshint = require('gulp-jshint');
const jshintStylish = require('jshint-stylish');
const autoprefixer = require('gulp-autoprefixer');
const logger = require('gulp-logger');
const inject = require('gulp-inject');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');

gulp.task('clean', () =>
    gulp.src('dist')
        .pipe(logger({
            before: '-CLEAN- Deletando pasta dist',
            after: '-CLEAN- dist deletada'
        }))
        .pipe(clean())
);

gulp.task('copy', ['clean', 'css'], () =>
    gulp.src('src/**/*')
        .pipe(logger({
            before: '-COPY- Copiando src/ para dist/',
            after: '-COPY- dist/ criada'
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('imagemin', () => {
    gulp.src('src/assets/images/**/*')
        .pipe(logger({
            before: '-IMAGEMIN- Otimizando imagens',
            after: '-IMAGEMIN- Imagens otimizadas'
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('fonts', () => {
    gulp.src('src/assets/fonts/**/*')
        .pipe(logger({
            before: '-FONTS- Exportando fontes',
            after: '-FONTS- Fontes exportadas'
        }))
        .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('css', () =>
    gulp.src(['src/css/base/reset.css', 'src/css/base/**/*.css','src/css/views/**/*.css'])
        .pipe(logger({
            before: '-CSS- minificando e adicionando prefixos ao CSS',
            after: '-CSS- Estilo gerado'
        }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('src/css/'))
);

gulp.task('default', ['build']);

gulp.task('build', ['copy'], () => {
    gulp.start('imagemin', 'fonts');
});

gulp.task('inject', () =>
    gulp.src('src/index.html')
        .pipe(inject(gulp.src('src/js/app/polyfill/*.js', { read: false }), { 
            starttag: '<!-- inject:polyfill:{{ext}} -->',
            relative: true
        }))
        .pipe(inject(gulp.src('src/js/app/models/*.js', { read: false }), { 
            starttag: '<!-- inject:models:{{ext}} -->',
            relative: true
        }))
        .pipe(inject(gulp.src('src/js/app/controllers/*.js', { read: false }), { 
            starttag: '<!-- inject:controllers:{{ext}} -->',
            relative: true
        }))
        .pipe(inject(gulp.src('src/js/app/helpers/*.js', { read: false }), { 
            starttag: '<!-- inject:helpers:{{ext}} -->',
            relative: true
        }))
        .pipe(inject(gulp.src(['src/js/app/views/View.js','src/js/app/views/*.js'], { read: false }), { 
            starttag: '<!-- inject:views:{{ext}} -->',
            relative: true
        }))
        .pipe(inject(gulp.src('src/js/app/services/*.js', { read: false }), { 
            starttag: '<!-- inject:services:{{ext}} -->',
            relative: true
        }))
        .pipe(inject(gulp.src('src/js/app/dao/*.js', { read: false }), { 
            starttag: '<!-- inject:dao:{{ext}} -->',
            relative: true
        }))
        .pipe(gulp.dest('src/'))
);

gulp.task('server', ['inject'], () => {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', event => {
        gulp.src(event.path)
            .pipe(jshint({ esversion: 6 }))
            .pipe(jshint.reporter(jshintStylish));
    });
    gulp.watch('src/css/**/*.css', ['css']);
});