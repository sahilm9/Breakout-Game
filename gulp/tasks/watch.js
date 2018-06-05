var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch',function(){

  browserSync.init({
    notify: false,
    server:{
      baseDir: "app"
    }
  });

  watch(`./app/index.html`, function(){
    browserSync.reload();
  });

  watch('./app/src/styles/*.css',function(){
    gulp.start('cssInject');
  });

  watch('./app/src/scripts/*.js', function(){
    gulp.start('scriptsRefresh');
  })

});

gulp.task('cssInject',['styles'], function(){
  return gulp.src('./app/dist/styles/styles.css')
  .pipe(browserSync.stream());
})

gulp.task('scriptsRefresh', ['scripts'],function(){
  browserSync.reload();
})