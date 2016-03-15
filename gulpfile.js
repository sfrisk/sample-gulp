var gulp = require( 'gulp' ),
	sass = require( 'gulp-sass' ),
	prefix = require( 'gulp-autoprefixer' ),
	rename = require( 'gulp-rename' ),
	compress = require( 'gulp-compressor' ),
	browserSync = require('browser-sync').create()

gulp.task( 'scss', function() {

gulp.src('app/scss/styles.scss')
	.pipe( sass() )
	.on('error', function (err) { console.error(err); })
	.pipe( prefix('last 5 versions') )
	.pipe( gulp.dest( 'app/css' ) )
	.pipe( compress() )
	.pipe( rename( { suffix: '.min' }) )
	.pipe( gulp.dest( 'dist/css' ) );
});


gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('watch', ['browserSync', 'scss'], function(){
	gulp.watch( 'app/scss/**/*.scss', ['scss'] );
	gulp.watch( 'app/css/*.css', browserSync.reload );
	gulp.watch( 'app/**/*.html', browserSync.reload );

});

gulp.task( 'default', ['watch']);
