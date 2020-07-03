# angular-file
Easy to use Angular directives for user file selections ([DEMO PAGE](http://ackerapple.github.io/angular-file/))

[![hire me](https://ackerapple.github.io/resume/assets/images/hire-me-badge.svg)](https://ackerapple.github.io/resume/)
[![npm version](https://badge.fury.io/js/angular-file.svg)](http://badge.fury.io/js/angular-file)
[![npm downloads](https://img.shields.io/npm/dm/angular-file.svg)](https://npmjs.org/angular-file)
[![Dependency Status](https://david-dm.org/ackerapple/angular-file.svg)](https://david-dm.org/ackerapple/angular-file)
[![Build status](https://ci.appveyor.com/api/projects/status/sq815bogrtky29b8?svg=true)](https://ci.appveyor.com/project/AckerApple/angular-file/branch/development)
[![Build Status](https://travis-ci.org/AckerApple/angular-file.svg?branch=development)](https://travis-ci.org/AckerApple/angular-file)
[![min size](https://badgen.net/bundlephobia/min/angular-file)](https://bundlephobia.com/result?p=angular-file)
[![minzip size](https://badgen.net/bundlephobia/minzip/angular-file)](https://bundlephobia.com/result?p=angular-file)

> This package is to handle select/drag/drop of files. Once files are selected, for uploading, you then use Angular's `@angular/common/http` for uploading selected files ([see here for more on uploading](#uploading)).

<details>
  <summary>Table of Contents</summary>

- [Quick Start](#quick-start)
- [Examples](#examples)
  - [Practical Example](#practical-example)
  - [Select Files Examples](#select-files-examples)
  - [Drop Files Examples](#drop-files-examples)
- [API](#api)
  - [ngf Directive](#ngf-directive)
  - [ngfDrop Directive](#ngfdrop-directive)
  - [ngfBackground Directive](#ngfbackground-directive)
  - [ngfSrc Directive](#ngfsrc-directive)
  - [ngfSelect Directive](#ngfselect-directive)
  - [ngfUploadStatus Directive](#ngfuploadstatus-directive)
- [Uploading](#uploading)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Credits](#credits)
- [License](#license)

</details>

## Quick Start

1. A recommended way to install ***angular-file*** is through [npm](https://www.npmjs.com/search?q=angular-file) package manager using the following command:

  `npm install angular-file --save-dev`

  Alternatively, you can [download it in a ZIP file](https://github.com/ackerapple/angular-file/archive/master.zip).

2. Currently `angular-file` contains three directives: `ngf`, `ngfSelect`, and `ngfDrop`. `ngf` and `ngfSelect` are quite the same with just different defaults and they both utilize `<input type="file" />` functionality. `ngfDrop` is used to designate an area that will be used for dropping of file(s).

3. More information regarding using of ***angular-file*** is located in [demo](http://ackerapple.github.io/angular-file/) and [demo sources](https://github.com/ackerapple/angular-file/tree/development/demo).

## Examples

### Practical Example
An example intended to have every line needed to run an app with angular-file.  To use this example, replace the contents of main.ts with this code, and add `<app></app>` to the body of index.html

```typescript
import { ngfModule, ngf } from "angular-file"
import { Component, NgModule } from "@angular/core"
import {
  HttpClient, HttpClientModule, HttpRequest, HttpResponse, HttpEvent
} from "@angular/common/http"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
import { BrowserModule } from '@angular/platform-browser'
import { Subscription } from 'rxjs'

//two ways to upload files
const template = `
<input
  ngf
  multiple
  type      = "file"
  accept    = "image/*"
  [(files)] = "files"
  maxSize   = "1024"
/>
<button *ngIf="files" (click)="uploadFiles(files)">send files</button>

<ngfFormData
  [files]      = "files"
  [(FormData)] = "myFormData"
  postName     = "file"
></ngfFormData>

<ngfUploadStatus
  [(percent)] = "uploadPercent"
  [httpEvent] = "httpEvent"
></ngfUploadStatus>

<div *ngIf="uploadPercent">
  Upload Progress: {{ uploadPercent }}%
</div>
`

@Component({
  selector: 'app',
  template: template
})
export class AppComponent {
  postUrl = '...'
  myFormData:FormData//populated by ngfFormData directive
  httpEvent:HttpEvent<{}>

  constructor(public HttpClient:HttpClient){}

  uploadFiles(files:File[]) : Subscription {
    const config = new HttpRequest('POST', this.postUrl, this.myFormData, {
      reportProgress: true
    })
    
    return this.HttpClient.request( config )
    .subscribe(event=>{
      this.httpEvent = event
      
      if (event instanceof HttpResponse) {
        alert('upload complete, old school alert used')
      }
    },
    error=>{
      alert('!failure beyond compare cause:' + error.toString())
    })
  }
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ngfModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```


### Select Files Examples
Examples of how to allow file selection

Multiple
```html
<input type="file" ngf [(files)]="files" multiple  />
```

Single
```html
<input type="file" ngf [(file)]="file" />
```

Element
```html
<div ngfSelect multiple="1" [(files)]="files">
  Tap to Select
</div>
```

Image Backgrounds Only
```html
<button ngfSelect [(file)]="userFile" accept="image/*" multiple="1">
  Tap to Select
</button>
<div [ngfBackground]="userFile"
  style="background-size:cover;background-repeat:no-repeat;width:50px;height:50px"
></div>
```

Images Only
```html
<button ngfSelect [(file)]="userFile" accept="image/*" multiple="1">
  Tap to Select
</button>
<img [ngfSrc]="userFile" />
```

### Drop Files Examples
Examples of how to allow file drag/drop

Basic
```html
<div ngfDrop
  [(files)]="files"
  [(file)]="file"
  ([validDrag])="validDrag"
  ([invalidDrag])="invalidDrag"
  [ngClass]="{'myHoverClass': validDrag, 'myAntiHoverClass': validDrag}"
>
  Drop Files Here
</div>
```
Combo Drop Select
```html
<div ngfDrop selectable="1" multiple="1"
  [(files)]="files"
  [(validDrag)]="validComboDrag"
  [(invalidDrag)]="invalidComboDrag"
  [ngClass]="{'goodDragClass':validComboDrag, 'badDragClass':invalidComboDrag}"
>
  Combo drop/select zone
</div>
```

## API

- [ngf Directive](#ngf-directive)
- [ngfDrop Directive](#ngfdrop-directive)
- [ngfSelect Directive](#ngfselect-directive)
- [ngfBackground Directive](#ngfbackground-directive)
- [ngfSrc Directive](#ngfsrc-directive)
- [ngfUploadStatus Directive](#ngfuploadstatus-directive)

### ngf Directive
A base directive that provides abilities of ngfDrop and ngfSelect. Does **not** auto default nor auto host element events like hover/drag/drop (see [ngfDrop](#ngfdrop-directive) and/or [ngfSelect](#ngfselect-directive))
```typescript
ngf             : ngf//reference to directive class
[multiple]          : string
[accept]            : string
[maxSize]           : number//bytes . 1024 = 1k . 1048576 = 1mb
[ngfFixOrientation] : boolean = true
[fileDropDisabled]  : any = false
[selectable]        : any = false
[(lastInvalids)]    : {file:File,type:string}[] = []
[(lastBaseUrl)]     : string//Base64 od last file uploaded url
[(file)]            : File//last file uploaded
[(files)]           : File[]
(init)              : EventEmitter<ngf>
```

### ngfDrop Directive
Extends [ngf](#ngf-directive) and then auto hosts element event watching of hover/drag/drop
```javascript
[fileDropDisabled]  : any = false
(fileOver)      :EventEmitter<any> = new EventEmitter()
[(validDrag)]   :any = false
[(invalidDrag)] :any = false
```

> Supporting Internet Explorer 11 or less?
>> Only (fileOver) works accurately
>> [(validDrag)] & [(invalidDrag)] should NOT be used as IE11 does not indicate the number of files NOR the types of files being dragged like other modern web browsers

### ngfSelect Directive
Extends [ngf](#ngf-directive) and auto engages click base file selecting
```javascript
[selectable]:any = true
```

### ngfBackground Directive
```javascript
[ngfBackground]:File
```

### ngfSrc Directive
```javascript
[ngfSrc]:File
```

### ngfUploadStatus Directive
Does calculations of an upload event and provideds percent of upload completed
```typescript
[(percent)]:number
[httpEvent]:Event
```

### ngfFormData Directive
Converts files to FormData
```typescript
[files]:File[]
[postName]:string = "file"
[fileName]:string//optional force file name
[(FormData)]:FormData
```

## Uploading
Angular, natively, makes uploading files so very easy!

*Did you know?*
- You do NOT and should NOT use a seperate package to upload files other than `@angular/common`
- You do not need a package like ng2-file-upload which have outdated non-core-community driven file uploading scripts
- Just can just use `@angular/common` to send files! Why add more unneccessary weight of dependency of another package?
- Multi file uploading is so easy with `@angular/common`
- You will have the most control seperating your file selecting from file uploading
- You should use this package, angular-file, to select files and then give to Angular to upload

*Uploading files is as easy as:*
```
import { Subscription } from "rxjs"//only included for data typing
import {
  HttpClient, HttpRequest, HttpResponse
} from "@angular/common/http"

export const uploadFiles(files:File[]) : Subscription {
  const postUrl = "..."
  const myFormData:FormData = new FormData()
  
  files.forEach(file=>myFormData.append("file", file, "file-name.xyz"))

  const config = new HttpRequest("POST", postUrl, myFormData), {
    reportProgress: true
  })
  
  return this.HttpClient.request( config )
  .subscribe(event=>{    
    if (event instanceof HttpResponse) {
      alert('upload complete, old school alert used')
    }
  },
  error=>{
    alert('!failure cause:' + error.toString())
  })
}
```


## Troubleshooting
Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/ackerapple/angular-file/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

## Development
Work on this package

> Source files are on not the default github branch

- [source files here](https://github.com/AckerApple/angular-file.git)

```
git clone https://github.com/AckerApple/angular-file.git -b development
```

## Credits
- Current Author: Acker Apple
- Forked from outdated package: [ng2-file-upload](https://www.npmjs.com/package/ng2-file-upload)

## License
The MIT License (see the [LICENSE](https://github.com/ackerapple/angular-file/blob/master/LICENSE) file for the full text)
