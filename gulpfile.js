var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    util = require('gulp-util'),
    concat = require('gulp-concat'),
    minimist = require('minimist'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
	livereload = require('gulp-livereload'),
	fileinclude = require('gulp-file-include');

var env = minimist(process.argv.slice(2));
console.log( env.env );

var config = {};
config = ( typeof( env.env ) === "undefined" || env.env === true ) ? require('./config.json') : require('./config_'+ env.env +'.json');

gulp.task('build-sass', function(){
	if( typeof( env.env ) !== "undefined" || env.env === "production" ){
		return gulp.src('./scss/**/*.scss')
			.pipe( sass({outputStyle:'compressed'}).on('error', sass.logError))
			.pipe( gulp.dest('./'));
	}
	return gulp.src('./scss/**/*.scss')
		.pipe( sourcemaps.init() )
		.pipe( sass({outputStyle:'compact'}).on('error', sass.logError))
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest('./'))
		.pipe( livereload() );
});

gulp.task('build-js', function(){
	if( typeof( env.env ) !== "undefined" || env.env === "production" ){
		util.log("Buildig for " + env.env );

		return gulp.src([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/tether/dist/js/tether.js',
			'node_modules/bootstrap/dist/js/bootstrap.js',
			'node_modules/angular/angular.js',
			'node_modules/angular-resource/angular-resource.js',
			'node_modules/angular-localization/dist/angular-localization.js',
			'node_modules/angular-route/angular-route.js',
			'node_modules/angular-parse/angular-parse.js',
			'node_modules/fastclick/lib/fastclick.js',
			'js/components/**/*.js',
			'js/**/modules/*.js',
			'js/**/*.js'
		])
		.pipe( concat('application.js').on('error', function( error ){
			util.log( util.colors.red( error ) );
			util.beep();
			
			this.emit('end');
		}))
		.pipe( uglify({mangle:false}).on('error', function( error ){
			util.log( util.colors.red( error ) );
			util.beep();

			this.emit('end');
		}))
		.pipe(replace( '@@api_url', config.api_url ) )
		.pipe( gulp.dest( 'dist/' ) );
	}
	
	return gulp.src([
		'node_modules/jquery/dist/jquery.js',
		'node_modules/tether/dist/js/tether.js',
		'node_modules/bootstrap/dist/js/bootstrap.js',
		'node_modules/angular/angular.js',
		'node_modules/angular-resource/angular-resource.js',
		'node_modules/angular-route/angular-route.js',
		'node_modules/angular-parse/angular-parse.js',
		'node_modules/fastclick/lib/fastclick.js',
		'js/**/components/*.js',
		'js/**/modules/*.js',
		'js/**/*.js'
	])
	.pipe( sourcemaps.init() )
	.pipe( concat('application.js').on('error', function( error ){
		util.log( util.colors.red( error ) );
		util.beep();
		
		this.emit('end');
	}))
	.pipe( sourcemaps.write() )
	.pipe(replace( '@@api_url', config.api_url ) )
	.pipe( gulp.dest( 'dist/' ) )
	.pipe( livereload() );
});

gulp.task('build-index', function(){
	if( typeof( env.env ) !== "undefined" || env.env === "production" ) {
		return gulp.src([
			'index_original.html'
		])
			.pipe(rename('./index.html'))
			.pipe(replace('@@timestamp', Date.now()))
			.pipe(replace("@@include('./index/livereload.html')", "<script></script>") )
			.pipe(gulp.dest(''))
			.pipe(livereload());
	}

	return gulp.src([
		'index_original.html'
	])
		.pipe(rename('./index.html'))
		.pipe(replace('@@timestamp', Date.now()))
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest(''))
		.pipe(livereload());
});

gulp.task('watch', function(){
	//env.env = "production";
	livereload.listen({ start: true });
	
	gulp.watch([
		'scss/**/*.scss',
	],[
		'build-sass'
	]);

	gulp.watch([
		'js/**/*.js'
	],[
		'build-js'
	]);
	
	gulp.watch([
		'index_original.html'
	],[
		'build-index'
	]);
});

gulp.task('watch-views', function(){
	gulp.src([
		'js/**/*.html'
	])
	.pipe( livereload() );
})

gulp.task('build', ['build-sass','build-js','build-index'] );

gulp.task('default',[
	'watch'
]);