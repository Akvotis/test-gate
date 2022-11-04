import webpack from 'webpack-stream';
import map from 'gulp-sourcemaps';
import uglify from 'gulp-uglify-es';
import babel from 'gulp-babel';

const plugins = [];

export const js = () => {
    return app.gulp.src(app.path.src.js, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'JS',
                message: 'Error: <%= error.message %>'
            }))
        )
        .pipe(map.init())
        .pipe(babel({
			presets: ['@babel/env']
		}))
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'main.min.js'
            }
        }))
        .pipe(uglify.default())
        .pipe(map.write('.'))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}

export const jsLibs = async () => {
    if(plugins.length > 0) {
        return app.gulp.src(plugins)
        .pipe(map.init())
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'libs.min.js'
            }
        }))
        .pipe(map.write('.'))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
    }
    
}

export const sideJs = () => {
    return app.gulp.src(`./src/scripts/side/*.js`)
    .pipe(app.gulp.dest(app.path.build.js))
}