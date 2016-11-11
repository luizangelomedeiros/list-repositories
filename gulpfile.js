/* CARREGANDO DEPENDÊNCIAS */
var app         = "app/";
var dist        = "dist/";
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var sass        = require('gulp-sass');
var minifyCSS   = require('gulp-minify-css');
var autoprefixer= require('gulp-autoprefixer');
var plumber     = require('gulp-plumber');
var htmlmin     = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var merge       = require('merge-stream');
var shell       = require('gulp-shell');

/* LISTA DE NAVEGADORES SUPORTE - AUTOPREFIXER*/
var autoPrefixBrowserList = [
    'last 2 version',
    'safari 5',
    'ie 8',
    'ie 9',
    'opera 12.1',
    'ios 6',
    'android 4'
];

/* ATUALIZA BROWSER */
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: dist
        },
        options: {
            reloadDelay: 250
        },
        notify: true
    });
});

/* COMPRIMIR SCRIPTS */
gulp.task('scripts', function() {
    var libs = gulp.src(app+'js/lib/*.js')
        .pipe(plumber())
        .pipe(concat('libs-angular.min.js'))
        .pipe(uglify())      
        .on('error', gutil.log)
        .pipe(gulp.dest(dist+'js/min/'))
        .pipe(browserSync.reload({stream: true}));

    var controllers = gulp.src(app+'js/controllers/*.js')
        .pipe(plumber())
        .pipe(concat('controllers.min.js'))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(gulp.dest(dist+'js/min/'))
        .pipe(browserSync.reload({stream: true}));

    var directives = gulp.src(app+'js/directives/*.js')
        .pipe(plumber())
        .pipe(concat('directives.min.js'))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(gulp.dest(dist+'js/min/'))
        .pipe(browserSync.reload({stream: true}));
        
    var main = gulp.src(app+'js/*.js')
        .pipe(plumber())
        .pipe(concat('main.min.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest(dist+'js/min/'))
        .pipe(browserSync.reload({stream: true}));
    
    return merge(libs, controllers, directives, main);
});

/* COMPILA E UNE CSS'S */
gulp.task('styles', function() {
    var css = gulp.src(app+'css/*.css')
        //Pega os erros
        .pipe(plumber({
          errorHandler: function (err) {
            console.log(err);
            this.emit('end');
          }
        }))    
        // Log de erros
        .on('error', gutil.log)
        // concatena arquivos sass
        .pipe(concat('styles.css'));

    var scss = gulp.src(app+'scss/init.scss')
        //Pega os erros
        .pipe(plumber({
          errorHandler: function (err) {
            console.log(err);
            this.emit('end');
          }
        }))
        // Compila Sass
        .pipe(sass({
              errLogToConsole: true,
              includePaths: [
                  app+'scss/'
              ]
        }))
        // insere os prefixos
        .pipe(autoprefixer({
           browsers: autoPrefixBrowserList,
           cascade:  true
        }))
        // Log de erros
        .on('error', gutil.log)
        // concatena arquivos sass
        .pipe(concat('styles.scss'));

    var merged = merge(scss, css)
        // concatena todos css's
        .pipe(concat('styles.min.css'))
        // minifica css geral
        .pipe(minifyCSS())
        // salva css final
        .pipe(gulp.dest(dist+'css/min/'))
        // notifica browserSync para dar recarregar pg
        .pipe(browserSync.reload({stream: true}));
    
    return merged;
});

/* COMPRIMIR HTML */
gulp.task('html', function() {
    var html = gulp.src(app+'*.html')
        .pipe(plumber())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}))
        .on('error', gutil.log);

    var directives = gulp.src(app+'js/directives/*.html')
        .pipe(plumber())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist+"js/directives/"))
        .pipe(browserSync.reload({stream: true}))
        .on('error', gutil.log);

    var partials = gulp.src(app+'partials/*.html')
        .pipe(plumber())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist+"partials/"))
        .pipe(browserSync.reload({stream: true}))
        .on('error', gutil.log);

    return merge(html, directives, partials);
});

/* CRIAR PASTAS */
gulp.task('scaffold', function() {
  return shell.task([
      'mkdir dist',
      'mkdir dist/js',
      'mkdir dist/fonts',
      'mkdir dist/css'
   ]);
});

/* COPIA */
gulp.task('copy', function() {    
    var pegaFonts = gulp.src('app/fonts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/fonts'));

    return pegaFonts;
});

/* TASK DEFAULT */
gulp.task('default', ['scaffold','copy','browserSync', 'scripts', 'styles', 'html'], function() {
    gulp.watch([
        app+'js/*.js',
        app+'js/controllers/*.js'
    ], ['scripts']);
    gulp.watch(app+'scss/**', ['styles']);
    gulp.watch([
        app+'*.html'
    ], ['html']);
});