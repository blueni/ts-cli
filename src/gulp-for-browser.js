const gulp = require( 'gulp' )
const browserify = require( 'browserify' )
const tsify = require( 'tsify' )
const source = require( 'vinyl-source-stream' )
const pkg = require( './package.json' )

gulp.task( 'ts', () => {
    return browserify({
            basedir: '.',
            debug: true,
            entries: [ pkg.main || 'src/*.ts' ],
        })
        .plugin( tsify )
        .bundle()
        .pipe( source( 'bundle.js' ) )
        .pipe( gulp.dest( 'dist' ) )
})

gulp.task( 'default', [ 'ts' ], () => {
    gulp.watch( 'src/*.ts', [ 'ts' ] )
})

gulp.task( 'build', [ 'ts' ] )
