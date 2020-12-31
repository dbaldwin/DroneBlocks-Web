const gulp = require('gulp');
const bs = require('browser-sync');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const webpackConfig = {
    output: {
        filename: '[name].min.js'
    },
    mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(scss|css)$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};

gulp.task('serve', () => {
    bs.init({
        port: 3000,
        server: {
            baseDir: './dist'
        },
        open: false
    })

    gulp.watch('./src').on('change', bs.reload);
})


gulp.task('views', () => {
    gulp.src('src/**/*.*')
        .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
    gulp.src(['src/js/main.js', 'src/js/missions.js'])
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('dist/js/lib/'));
})

gulp.task('build', () => {
    gulp.src('src/**/*.*')
        .pipe(gulp.dest('dist'));
    gulp.src(['src/js/main.js', 'src/js/missions.js'])
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('dist/js/lib/'));
})

gulp.task('watch', () => {
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/**/*.*', ['views']);
})

//gulp.task('default', gulp.series(['build', 'serve', 'watch', 'views', 'js']))

gulp.task('default', ['serve', 'watch', 'views', 'js'])