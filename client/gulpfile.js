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
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

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

// gulp.task('js-build', () => 
//     gulp.src(['dist/js/app-es6/**/*.js', '!dist/js/app-es6/polyfill/**/*.js'])
//         .pipe(babel({
//             presets: ['es2015'],
//             ignore: [
//                 'dist/js/app-es6/polyfill',
//                 'dist/js/app-es6/lib/system.js'
//             ],
//             plugins: ['transform-es2015-modules-systemjs'],
//             sourceMaps: true
//         }))
//         .on('error', console.error.bind(console))
//         .pipe(sourcemaps.init({ loadMaps: true }))
//         .pipe(uglify())
//         .pipe(sourcemaps.write('./'))
//         .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
//         .pipe(gulp.dest('dist/js/app/'))
// );

gulp.task('js', () =>
    gulp.src(['src/js/app-es6/**/*.js'])
        .pipe(babel({
            presets: ['es2015'],
            sourceMaps: true, 
            ignore: ["src/js/app-es6/lib/**/*.js"],
            plugins: ["transform-es2015-modules-systemjs"]
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('src/js/app/'))
);

gulp.task('default', ['build']);

gulp.task('build', ['copy'], () => {
    gulp.start('js-build', 'imagemin', 'fonts');
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

gulp.task('server', ['js'], () => {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);
    gulp.watch('src/js/app-es6/**/*.js').on('change', event => {
        gulp.src('src/js/app-es6/**/*.js')
            .pipe(jshint({ esversion: 6 }))
            .pipe(jshint.reporter(jshintStylish))
             .pipe(babel({
                presets: ['es2015'],
                ignore: ["src/js/app-es6/lib/**/*.js"],
                sourceMaps: true,
                plugins: ["transform-es2015-modules-systemjs"]
            }))
            .on('error', console.error.bind(console))
            .pipe(gulp.dest('src/js/app/'));
    });
    gulp.watch('src/css/**/*.css', ['css']);
});