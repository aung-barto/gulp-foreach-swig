var gulp = require('gulp'),
  gutil = require('gulp-util'),
  swig = require('gulp-swig'),
  data = require('gulp-data'),
  path = require('path'),
  foreach = require('gulp-foreach'),
  rename = require('gulp-rename');

function errorLog(error){
  console.error.bind(error);
  this.emit('end');
}

//Template Task
//Inject variables from JSON file into templates
gulp.task('templates', function(){
  return gulp.src('./data/*.json')
    .pipe(foreach(function(stream, file){
      var jsonFile = file;
      var jsonBasename = path.basename(jsonFile.path, path.extname(jsonFile.path));
      return gulp.src('./html/*.html')
      .pipe(data(function(){
        return require(jsonFile.path);
      }))
      .pipe(swig())
      .pipe(rename(function(htmlFile){
        htmlFile.basename = jsonBasename;
      }))
      .pipe(gulp.dest('./dist/'));
    }));
});
// Style Task
// Uglifies
// find any scss file and save into css folder - css is an example from another project
// gulp.task('styles', function(){
//  gulp.src('scss/**/*.scss')
//    .pipe(sass({
//      style: 'compressed'
//    }))
//    .on('error', errorLog)
//    .pipe(gulp.dest('css/'))
//    .pipe(livereload());
// });

// Watch Task
// Watches JS
  
gulp.task('watch', function(){

  gulp.watch('./html/*.html', ['templates']);
});

gulp.task('default', ['templates', 'watch']);
