const {series,parallel,src,dest} = require("gulp")
const del = require("del")
const browserify = require("browserify")
const source = require("vinyl-source-stream")
const tsify = require("tsify")
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

function limparDist(cb){
    return del(['dist'])
}
function copiarHtml(cb){
  return src('public/**/*').pipe(dest('dist'))
}

function GerarJs(cb){
    return browserify({
        basedir:'.',
        entries:['src/main.ts'],
        
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(dest('dist'))
}

function gerarJsMini(){
    return src('dist/app.js')
            .pipe(rename('app.min.js'))
            .pipe(uglify())
            .pipe(dest('dist'))
}

exports.default = series(
limparDist,
parallel(GerarJs,copiarHtml),
gerarJsMini
)