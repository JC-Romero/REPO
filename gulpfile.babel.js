import gulp from 'gulp'
import plumber from 'gulp-plumber'
import browserSync from 'browser-sync'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import watch from 'gulp-watch'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import sourcemaps from 'gulp-sourcemaps'
import buffer from 'vinyl-buffer'
import minify from 'gulp-minify'
import imagemin from 'gulp-imagemin'
import sitemap from 'gulp-sitemap'
import cachebust from 'gulp-cache-bust'
import tildeImporter from 'node-sass-tilde-importer'
import panini from 'panini'

const server = browserSync.create()

const postcssPlugins = [
  cssnano({
    core: true,
    zindex: false,
    autoprefixer: {
      add: true,
      browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
    }
  })
]

gulp.task('styles-dev', () => {
  gulp.src('./src/scss/styles.scss')
    .pipe(sourcemaps.init({ loadMaps : true}))
    .pipe(plumber())
    .pipe(sass({
      importer: tildeImporter,
      outputStyle: 'expanded',
      includePaths: ['./node_modules']
    }))
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/assets/css/'))
    .pipe(server.stream({match: '**/*.css'}))
})

gulp.task('styles-dev-2', () => {
  gulp.src('./src/assets/css/*.css')
  .pipe(gulp.dest('./public/assets/css/'))
})

gulp.task('styles-nuevo-maquetado', () => {
  gulp.src('./src/assets/css/nuevos/*.css')
  .pipe(gulp.dest('./public/assets/css/nuevos/'))
})

gulp.task('seo', () => {
  gulp.src('./src/assets/css/seo/*.css')
  .pipe(gulp.dest('./public/assets/css/'))
})

gulp.task('styles-build', () => {
  gulp.src('./src/scss/styles.scss')
    .pipe(plumber())
    .pipe(sass({
      importer: tildeImporter,
      includePaths: ['./node_modules']
    }))
    .pipe(postcss(
      [
        cssnano({
          core: true,
          zindex: false,
          autoprefixer: {
            add: true,
            browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
          }
        })
      ]
    ))
    .pipe(gulp.dest('./public/assets/css/'))
})

gulp.task('pages', () => {
  gulp.src('./src/pages/*.html')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/'
    }))
    .pipe(gulp.dest('./public'))
    .on('finish', server.reload);
})

gulp.task('pages:reset', (done) => {

  panini.refresh();
  gulp.run('pages');
  done();

});

gulp.task('scripts-dev', () =>
  browserify('./src/js/index.js')
    .transform(babelify, {
      global: true // permite importar desde afuera (como node_modules)
    })
    .bundle()
    .on('error', function (err) {
      console.error(err)
      this.emit('end')
    })
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(minify({
      ext: {
        src: '-min.js',
        min: '.js'
      }
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/assets/js'))
)

gulp.task('scripts-nuevo-maquetado', () => {
  gulp.src('./src/assets/js/nuevos/*.css')
  .pipe(gulp.dest('./public/assets/js/nuevos/'))
})

gulp.task('scripts-build', () =>
  browserify('./src/js/index.js')
    .transform(babelify, {
      global: true // permite importar desde afuera (como node_modules)
    })
    .bundle()
    .on('error', function (err) {
      console.error(err)
      this.emit('end')
    })
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(minify({
      ext: {
        src: '.js',
        min: '-min.js'
      }
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/assets/js'))
)

gulp.task('images-build', () => {
  gulp.src('./src/assets/img/**/**')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('./public/assets/img'))
})

gulp.task('images-dev', () => {
  gulp.src('./src/assets/img/**/**')
    .pipe(gulp.dest('./public/assets/img'))
})

gulp.task('sitemap', () => {
  gulp.src('./public/**/*.html', {
    read: false
  })
    .pipe(sitemap({
      siteUrl: 'https://example.com' // remplazar por tu dominio
    }))
    .pipe(gulp.dest('./public'))
})


gulp.task('assets', () => {
  gulp.src('./src/assets/**/**')
    .pipe(gulp.dest('./public/assets'))
})


gulp.task('dev', ['styles-dev', 'pages', 'scripts-dev', 'scripts-nuevo-maquetado', 'images-dev','assets','styles-dev-2', 'styles-nuevo-maquetado', 'seo'], () => {
  server.init({
    server: {
      baseDir: './public'
    }
  })

  watch('./src/scss/**/**', () => gulp.start('styles-dev'),server.reload)
  watch('./src/assets/css/**/**', () => gulp.start('styles-dev-2', server.reload))
  watch('./src/assets/css/nuevos/**', () => gulp.start('styles-nuevo-maquetado', server.reload))
  watch('./src/assets/js/nuevos/**', () => gulp.start('scripts-nuevo-maquetado', server.reload))
  watch('./src/assets/css/seo/**', () => gulp.start('seo', server.reload))
  watch('./src/js/**/**', () => gulp.start('scripts-dev', server.reload))
  watch('./src/assets/img/**/**', () => gulp.start('images-dev'))
  watch('./src/pages/*.html', ()=> gulp.start('pages'))
  watch('./src/{layouts,partials,helpers,data}/**/*', () => gulp.start('pages:reset'))
  
})

gulp.task('cache', () => {
  gulp.src('./public/**/*.html')
    .pipe(cachebust({
      type: 'timestamp'
    }))
    .pipe(gulp.dest('./public'))
})


//gulp.task('build', ['styles-build', 'pages', 'scripts-build', 'images-build', 'cache', 'sitemap'])

gulp.task('build', ['styles-build', 'pages', 'scripts-dev','images-dev','fuentes','media','lib','cache', 'sitemap'])
