 var gulp = require('gulp'),
     concat = require('gulp-concat'),
     rename = require('gulp-rename'),
     uglify = require('gulp-uglify'),
     minifycss = require('gulp-minify-css'),
     gulpCopy = require('gulp-file-copy'),
     fs = require('fs'),
     path = require('path'),
     zip = require('gulp-zip'),
     jshint = require('gulp-jshint'),
     JSON2 = require('JSON2'),
     dateTime = require('easy-datetime').default,
     jsdoc = require("gulp-jsdoc3"),
     del = require('del');

 var DOCUMENT_DIR = 'document'; // API 文档地址
 var SOURCE = 'source/**/*.js'; // 源码地址
 var VERSION = '0.0.1'; // 默认版本号
 var APP_RELESE_DIR = 'dist'; // RELEASE 版本地址
 var VERSION_DIR = 'version'; // 存放版本信息JSON 文件夹地址

 /**
  * 
  * @param  {[type]} source  [description]
  * @param  {[type]} target  [description]
  * @param  {[type]} version [description]
  * @return {[type]}         [description]
  */
 function _createDoc(source, target, version) {
     source = source || SOURCE;
     target = target || DOCUMENT_DIR;
     version = version || VERSION;
     del([target], null);
     var config = {
         "opts": {
             "encoding": "utf8",
             "destination": target
         },
         "templates": {
             "systemName": 'NPMapLib_V' + v,
             "copyright": 'Copyright (c) 2016 Netposa lishigang@netposa.com,songjiang_xa@netposa.com',
             "theme": 'cerulean',
             "includeDate": true,
             "outputSourceFiles": false,
             "outputSourcePath": false,
             "dateFormat": 'YYYY-MM-DD',
             "navType": "vertical",
             "linenums": true
         }
     };
     gulp.src(source, {
             read: false
         })
         .pipe(jsdoc(config, null));
 };


 /**
  * 创建API 文档
  * @param  {[type]} source  [description]
  * @param  {[type]} target  [description]
  * @param  {[type]} version [description]
  * @return {[type]}         [description]
  */
 exports.crateDoc = function(source, target, version) {
     _createDoc(source, target, version)
 };

 /**
  * js 打包
  * @param  {[type]} lib       [description]
  * @param  {[type]} fileName  [description]
  * @param  {[type]} targetDir [description]
  * @return {[type]}           [description]
  */
 exports.minJs = function(lib, fileName, targetDir) {
     lib = SOURCE;
     targetDir = targetDir || APP_RELESE_DIR;
     return gulp.src(lib)
         .pipe(concat(fileName))
         .pipe(rename(fileName))
         .pipe(uglify())
         .pipe(gulp.dest(targetDir));
 };
 /**
  * css 打包
  * @param  {[type]} lib       [description]
  * @param  {[type]} fileName  [description]
  * @param  {[type]} targetDir [description]
  * @return {[type]}           [description]
  */
 exports.minCss = function(lib, fileName, targetDir) {
     targetDir = targetDir || APP_RELESE_DIR;
     return gulp.src(lib)
         .pipe(concat(fileName))
         .pipe(minifycss())
         .pipe(gulp.dest(targetDir));
 };
 /**
  * 压缩
  * @param  {[type]} lib       [description]
  * @param  {[type]} fileName  [description]
  * @param  {[type]} targetDir [description]
  * @return {[type]}           [description]
  */
 exports.zip = function(lib, fileName, targetDir) {
     targetDir = targetDir || VERSION_DIR;
     return gulp.src(lib)
         .pipe(zip(fileName)).pipe(gulp.dest(targetDir));
 };
 /**
  * 版本JSON文件生成
  * @param  {[type]} fileName [description]
  * @param  {[type]} content  [description]
  * @return {[type]}          [description]
  */
 exports.writeVersion = function(fileName, contentStr, version) {
     fs.readFile(VERSION_DIR + '/version.json', function(err, data) {
         if (err) {
             return;
         }
         data = JSON2.parse(data.toString() || '[]');
         data.push({
             "version": version || VERSION,
             "content": contentStr,
             "date": dateTime.format('yyyy-MM-dd hh:mm', new Date()),
             "url": fileName
         });
         fs.writeFile(VERSION_DIR + '/version.json', JSON2.stringify(data), function(err) {
             if (err) {
                 console.log('失败');
             }
         });
     })
 };

 /**
  * 生成二维或三维index.html 页面
  * @param  {string} libName  map2d | map3d  
  */
 exports.createFile = function(libName) {
     var contents = '';
     if (libName === 'map2d') {
         contents = '<!DOCTYPE html>' +
             '<html lang="en">' +
             '<head>' +
             ' <meta charset="utf-8">' +
             '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
             ' <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">' +
             ' <title>NPMAP3D Demo</title>' +
             ' <style>' +
             ' #viewerContainer {' +
             '    position: absolute;' +
             '    top: 0px;' +
             '    left: 6px;' +
             '    width: 98%;' +
             '    height: 98%;' +
             ' }' +
             ' </style>' +
             '</head>' +
             '<body>' +
             ' <div id="viewerContainer">' +
             '</div>' +
             '<script src="init.js"></script>' +
             '<script type="text/javascript">' +
             "var mapContainer = document.getElementById('viewerContainer');" +
             "var map = new NPMapLib.Map(mapContainer, {" +
             "minZoom: 5," +
             "maxZoom: 18," +
             "projection: 'EPSG:900913'," +
             " centerPoint:[11628328.629245,3957647.1667763]" +
             "});" +
             ' var url = ["http://webrd01.is.autonavi.com/appmaptile??lang=zh_cn&size=1&scale=1&style=7", "http://webrd02.is.autonavi.com/appmaptile??lang=zh_cn&size=1&scale=1&style=7", "http://webrd03.is.autonavi.com/appmaptile??lang=zh_cn&size=1&scale=1&style=7", "http://webrd04.is.autonavi.com/appmaptile??lang=zh_cn&size=1&scale=1&style=7"];' +
             ' var layerSLYX = new NPMapLib.Layers.GaoDeLayer(url, "ditu");' +
             '  map.addLayers([layerSLYX]);' +
             '</script>' +
             '</body>' +
             '</html>';
     } else {
         contents = '<!DOCTYPE html>' +
             '<html lang="en">' +
             '<head>' +
             ' <meta charset="utf-8">' +
             '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
             ' <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">' +
             ' <title>NPMAP3D Demo</title>' +
             ' <style>' +
             ' #viewerContainer {' +
             '    position: absolute;' +
             '    top: 0px;' +
             '    left: 6px;' +
             '    width: 98%;' +
             '    height: 98%;' +
             ' }' +
             ' </style>' +
             '</head>' +
             '<body>' +
             ' <div id="viewerContainer">' +
             '</div>' +
             '<script src="NPMAP3D.js"></script>' +
             '<script type="text/javascript">' +
             "map = viewer = new NPMAP3D.MAP3D('viewerContainer');" +
             'viewer.basemap({' +
             '   basemap: NPMAP3D.BaseMap.AMAP_ROAD' +
             '});' +
             '</script>' +
             '</body>' +
             '</html>';
     }
     if (!fs.existsSync(APP_RELESE_DIR)) {
         fs.mkdirSync(APP_RELESE_DIR);
     }
     fs.writeFileSync(path.join(APP_RELESE_DIR, 'index.html'), contents);
 };

 /**
  * PDF 文件生成
  * @param  {string[]} files 文件数组 
  * @param  {string} targetFile 生成的PDF 文件地址 
  */
 exports.createPdf = function(files, targetFile) {
     var child_process = require('child_process');
     files.push(targetFile);
     child_process.exec(__dirname + '/htmlToPdf/wkhtmltopdf.exe  -q ' + files.join(' '), function(error, stdout, stderr) {
         if (!error) {
             console.log('done');
         } else {
             console.error(error);
         }
     });
 };
