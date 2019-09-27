var gulp = require('gulp');
var sass = require('gulp-sass');//npm rebuild node-sass
var minifyHtml = require('gulp-minify-html');
var browser = require('browser-sync').create();


gulp.task('css',function(done){
	gulp.src('./src/css/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./dist/css/'))
	done()
})

gulp.task('html',function(done){
	gulp.src('./src/*.html')
	.pipe(minifyHtml())
	.pipe(gulp.dest('./dist/'))
	done()
})

gulp.task('server',gulp.series(gulp.parallel('css','html'),function(done){
	browser.init({
		server:"./dist/",
		port:80

	});
	gulp.watch('./src/',gulp.series(gulp.parallel('css','html'),function(done){
		browser.reload();
		done()

	}))
	done();
}))
