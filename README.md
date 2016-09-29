## netposa JS 前端工具帮助



**Includes**
>- minJs js 打包
>- minCss css 打包
>- zip 压缩
>- writeVersion 版本JSON文件生成
>- createFile 生成二维或三维index.html 页面
>- createPdf 生成PDF 文件

---

**Install**

---
```js
npm install netposa --save
```

---
**Usage**
---
``` js
var tool = require('netposa');
```

**tool.crateDoc **
---
API 文档生成

```js
tool.crateDoc(source, target) 
//source 源码位置，默认为soure/**/*.js
//target api 文档地址，默认 document
```

**tool.minJs**
js 打包
---
```js
tool.minJs(lib, fileName, targetDir)
// lib  源码位置，默认为soure/**/*.js
// fileName 打包直接JS 的文件名称
// targetDir 打包之后存放地址
```

**tool.minCss**
css 打包
---
```js
tool.minCss(lib, fileName, targetDir)
// lib   css 所在位置
// fileName 打包直接css 的文件名称
// targetDir 打包之后存放地址
```

**tool.zip**
  压缩
---
```js
tool.zip(lib, fileName, targetDir)
// lib   css 所在位置
// fileName 打包直接css 的文件名称
// targetDir  默认version 文件夹
```

**tool.writeVersion**
  版本JSON文件生成
---
```js
tool.writeVersion(fileName, contentStr, version)
// fileName   版本文件地址
// contentStr 本次修改内容
// version    版本号
```

**tool.createFile**
  生成二维或三维index.html 页面
---
```js
tool.createFile(libName)
// libName   生成二维或三维index.html 页面 map2d | map3d  
```

**tool.createPdf**
  生成PDF 文件
---
```js
tool.createPdf(files, targetFile)
// files   html文件数组 
// targetFile 生成的PDF 文件地址 
```
ssjylsg<ssjylsg@126.com>