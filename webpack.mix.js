const mix = require('laravel-mix');

mix.browserSync({
    proxy: '0.0.0.0:8081',
    open: false
  })
   .js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .version()