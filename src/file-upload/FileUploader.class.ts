import { FileLikeObject } from './FileLikeObject.class'
import { FileItem } from './FileItem.class'
import { FileType } from './FileType.class'

import { EventEmitter, Output } from '@angular/core'

function getWindow():any{return window}

function isFile(value:any):boolean {
  return (File && value instanceof File);
}
// function isFileLikeObject(value:any) {
export interface Headers {
  name:string;
  value:string;
}

export type ParsedResponseHeaders = {[headerFieldName:string]:string};

export type FilterFunction = {
  name:string,
  fn:(item?:FileLikeObject, options?:FileUploaderOptions)=>boolean
};

export interface FileUploaderOptions {
  forceFilename?:string;//override that all files will have defined name
  forcePostname?:string//override all FormData post names
  accept?:string;//acts like file input accept
  allowedMimeType?:Array<string>;
  allowedFileType?:Array<string>;
  autoUpload?:boolean;
  isHTML5?:boolean;
  filters?:Array<FilterFunction>;
  headers?:Array<Headers>;
  method?:string;
  authToken?:string;
  maxFileSize?:number;
  queueLimit?:number;
  removeAfterUpload?:boolean;
  url?:string;
  disableMultipart?:boolean;
  itemAlias?: string;
  authTokenHeader?: string;
  additionalParameter?:{[key: string]: any};
}

export class FileUploader {
  @Output() done = new EventEmitter()
  @Output() success = new EventEmitter()
  @Output('catch') catcher = new EventEmitter()

  authToken:string;
  isUploading:boolean = false;
  queue:Array<FileItem> = [];
  progress:number = 0;
  _nextIndex:number = 0;
  autoUpload:any;
  authTokenHeader: string;

  options:FileUploaderOptions = {
    autoUpload: false,
    isHTML5: true,
    filters: [],
    removeAfterUpload: false,
    disableMultipart: false
  };

  constructor(options:FileUploaderOptions={}) {
    this.setOptions(options);
  }

  setOptions(options:FileUploaderOptions):void {
    this.options = Object.assign(this.options, options);

    this.authToken = options.authToken;
    this.authTokenHeader = options.authTokenHeader || 'Authorization';
    this.autoUpload = options.autoUpload;

    this.options.filters = this.options.filters || []
    this.options.filters.unshift({name: 'queueLimit', fn: this._queueLimitFilter});
    this.options.filters.unshift({name: 'fileSize', fn: this._fileSizeFilter});
    this.options.filters.unshift({name: 'fileType', fn: this._fileTypeFilter});
    this.options.filters.unshift({name: 'mimeType', fn: this._mimeTypeFilter});
    this.options.filters.unshift({name: 'accept', fn: this._acceptFilter});

    for(let i = 0; i < this.queue.length; i++) {
      this.queue[i].url = this.options.url;
    }
  }

  isFileValid(file:File){
    let temp = new FileLikeObject(file);
    return this._isValidFile(temp, this.options.filters, this.options)
  }

  isFilesValid(files:File[]){
    for(let x=files.length-1; x >= 0; --x){
      if( !this.isFileValid(files[x]) ){
        return false
      }
    }
    return true
  }

  getValidFiles(files:File[]):File[]{
    const rtn = []
    for(let x=files.length-1; x >= 0; --x){
      if( this.isFileValid(files[x]) ){
        rtn.push(files[x])
      }
    }
    return rtn
  }

  getInvalidFiles(files:File[]):{file:File,type:string}[]{
    const rtn = []
    for(let x=files.length-1; x >= 0; --x){
      let failReason = this.getFileFilterFailName(files[x])
      if( failReason ){
        rtn.push({file:files[x], type:failReason})
      }
    }
    return rtn
  }

  addToQueue(
    files:File[],
    options?:FileUploaderOptions,
    filters?:FilterFunction[]|string
  ):void {
    let list:File[] = [];
    for (let file of files) {
      list.push(file);
    }
    let arrayOfFilters = this._getFilters(filters);
    let count = this.queue.length;
    let addedFileItems:FileItem[] = [];

    list.forEach((some:File,index:number) => {
      if (!options) {
        options = this.options;
      }

      if( this.isFileValid(some) ){
        let fileItem = new FileItem(this, some, options);
        addedFileItems.push(fileItem);
        this.queue.push(fileItem);
        this._onAfterAddingFile(fileItem);
      } else {
        let temp = new FileLikeObject(some);
        let filter = arrayOfFilters[index];
        this._onWhenAddingFileFailed(temp, filter, options);
      }
    });
    
    if (this.queue.length !== count) {
      this._onAfterAddingAll(addedFileItems);
      this.progress = this._getTotalProgress();
    }

    if (this.options.autoUpload) {
      this.uploadAll();
    }
  }

  removeFromQueue(value:FileItem):void {
    let index = this.getIndexOfItem(value);
    let item = this.queue[index];
    if (item.isUploading) {
      item.cancel();
    }
    this.queue.splice(index, 1);
    this.progress = this._getTotalProgress();
  }

  clearQueue():void {
    while (this.queue.length) {
      this.queue[0].remove();
    }
    this.progress = 0;
  }

  //most likely deprecated
  /*isHtml5Mode(){
    return this.options.isHTML5 || this.options.isHTML5==null
  }*/

  uploadItem(value:FileItem):Promise<any> {
    let index = this.getIndexOfItem(value);
    let item = this.queue[index];
    let transport = '_xhrTransport'
    
    //original author never finished this and iframe file sending is dead
    //let transport = this.isHtml5Mode() ? '_xhrTransport' : '_iframeTransport';
    
    item._prepareToUploading();
    if (this.isUploading) {
      return;
    }
    this.isUploading = true;
    return (this as any)[transport](item);
  }

  cancelItem(value:FileItem):void {
    let index = this.getIndexOfItem(value);
    let item = this.queue[index];
    
    let prop = item._xhr
    //original author never finished this
    //let prop = this.isHtml5Mode() ? item._xhr : item._form;
    
    if (item && item.isUploading) {
      prop.abort();
    }
  }

  uploadAll():Promise<any[]> {
    let items = this.getNotUploadedItems().filter((item:FileItem) => !item.isUploading);
    
    if (!items.length) {
      this.done.emit([])
      return Promise.resolve([]);
    }

    items.map((item:FileItem) => item._prepareToUploading());
    
    const promises = []

    promises.push( items[0].upload() )

    return Promise.all( promises )
    .then(r=>{
      this.done.emit(r)
      this.success.emit(r)
      return r
    })
    .catch(e=>{
      this.catcher.emit(e)
      return Promise.reject(e)
    })
  }

  cancelAll():void {
    let items = this.getNotUploadedItems();
    items.map((item:FileItem) => item.cancel());
  }

  isFile(value:any):boolean {
    return isFile(value);
  }

  isFileLikeObject(value:any):boolean {
    return value instanceof FileLikeObject;
  }

  getIndexOfItem(value:any):number {
    return typeof value === 'number' ? value : this.queue.indexOf(value);
  }

  getNotUploadedItems():Array<any> {
    return this.queue.filter((item:FileItem) => !item.isUploaded);
  }

  getReadyItems():Array<any> {
    return this.queue
      .filter((item:FileItem) => (item.isReady && !item.isUploading))
      .sort((item1:any, item2:any) => item1.index - item2.index);
  }

  destroy():void {
    return void 0;
    /*forEach(this._directives, (key) => {
     forEach(this._directives[key], (object) => {
     object.destroy();
     });
     });*/
  }

  onAfterAddingAll(fileItems:any):any {
    return {fileItems};
  }

  onBuildItemForm(fileItem:FileItem, form:any):any {
    return {fileItem, form};
  }

  onAfterAddingFile(fileItem:FileItem):any {
    return {fileItem};
  }

  onWhenAddingFileFailed(item:FileLikeObject, filter:any, options:any):any {
    return {item, filter, options};
  }

  onBeforeUploadItem(fileItem:FileItem):any {
    return {fileItem};
  }

  onProgressItem(fileItem:FileItem, progress:any):any {
    return {fileItem, progress};
  }

  onProgressAll(progress:any):any {
    return {progress};
  }

  onSuccessItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):any {
    return {item, response, status, headers};
  }

  onErrorItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):any {
    return {item, response, status, headers};
  }

  onCancelItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):any {
    return {item, response, status, headers};
  }

  onCompleteItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):any {
    return {item, response, status, headers};
  }

  onCompleteAll():any {
    return void 0;
  }

  _acceptFilter(item:FileLikeObject):boolean {
     this.acceptType(item.type === '' ? ('.' + item.name.split('.').pop()) : item.type);
  }

  acceptType(type:string):boolean {
    if(!this.options.accept)return true

    const defs = this.options.accept.split(',')
    let regx:RegExp = null
    let acceptRegString:string = null

    for(let x=defs.length-1; x >= 0; --x){
      //Escapes dots in mimetype 
      acceptRegString = defs[x]//.replace(/\./g,'\\.')
      //Escapes stars in mimetype 
      acceptRegString = acceptRegString.replace(/\*/g,'.*')
      //let acceptReg = '^((' + acceptRegString
      //acceptReg = acceptReg.replace(/,/g,')|(') + '))$'
      
      //try by mime
      regx = new RegExp(acceptRegString, 'gi')
      if( type.search(regx)>=0 ){
        return true
      }

      //try by ext
      if( acceptRegString.substring(0, 1)=='.' ){      
        regx = new RegExp(acceptRegString.substring(1, acceptRegString.length-1)+'$')
        if( type.search(regx)>=0 ){
          return true
        }
      }
    }
    return false
  }

  _mimeTypeFilter(item:FileLikeObject):boolean {
    return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
  }

  _fileSizeFilter(item:FileLikeObject):boolean {
    return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
  }

  _fileTypeFilter(item:FileLikeObject):boolean {
    return !(this.options.allowedFileType &&
    this.options.allowedFileType.indexOf(FileType.getMimeClass(item)) === -1);
  }

  _onErrorItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):void {
    item._onError(response, status, headers);
    this.onErrorItem(item, response, status, headers);
  }

  _onCompleteItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):void {
    item._onComplete(response, status, headers);
    this.onCompleteItem(item, response, status, headers);
    let nextItem = this.getReadyItems()[0];
    this.isUploading = false;
    if (nextItem) {
      nextItem.upload();
      return;
    }
    this.onCompleteAll();
    this.progress = this._getTotalProgress();
    //this._render();
  }

  protected _headersGetter(parsedHeaders:ParsedResponseHeaders):any {
    return (name:any):any => {
      if (name) {
        return parsedHeaders[name.toLowerCase()] || void 0;
      }
      return parsedHeaders;
    };
  }

  getQuedFiles():File[]{
    const rtn = []
    for(let x=0; x < this.queue.length; ++x){
      rtn.push( this.queue[x]._file )
    }
    return rtn
  }

  getFormData(files?:File[]){
    files = files || this.getQuedFiles()
    const formData = new FormData()
    
    for(let x=0; x < files.length; ++x){
      let filename = this.options.forceFilename || files[x].name
      let alias = this.options.forcePostname || 'file'
      formData.append(alias, files[x], filename);
    }

    return formData
  }

  protected _xhrTransport(item:FileItem):Promise<any> {
    let xhr = item._xhr = new XMLHttpRequest();
    let sendable:any;
    this._onBeforeUploadItem(item);
    // todo
    /*item.formData.map(obj => {
     obj.map((value, key) => {
     form.append(key, value);
     });
     });*/
    if (typeof item._file.size !== 'number') {
      throw new TypeError('The file specified is no longer valid');
    }
    if (!this.options.disableMultipart) {
      sendable = new FormData();
      this._onBuildItemForm(item, sendable);

      sendable.append(item.alias, item._file, item.file.name);

      if (this.options.additionalParameter !== undefined) {
        Object.keys(this.options.additionalParameter).forEach((key:string) => {
          sendable.append(key, this.options.additionalParameter[key]);
        });
      }
    } else {
      sendable = item._file;
    }

    return this.sendFormDataFileItem(sendable, item, xhr)
  }

  sendFormDataFileItem(sendable:FormData, item:FileItem, xhr?:XMLHttpRequest):Promise<any>{
    xhr = xhr || new XMLHttpRequest()

    xhr.upload.onprogress = (event:any) => {
      let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
      this._onProgressItem(item, progress);
    };
    
    return new Promise((res,rej)=>{
      xhr.onload = () => {
        let headers = this._parseHeaders(xhr.getAllResponseHeaders());
        let response = this._transformResponse(xhr.response, headers);
        let gist = this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
        let method = '_on' + gist + 'Item';
        (this as any)[method](item, response, xhr.status, headers);
        this._onCompleteItem(item, response, xhr.status, headers);
        res(response)
      };
      xhr.onerror = (e) => {
        let headers = this._parseHeaders(xhr.getAllResponseHeaders());
        let response = this._transformResponse(xhr.response, headers);
        this._onErrorItem(item, response, xhr.status, headers);
        this._onCompleteItem(item, response, xhr.status, headers);
        rej(e)
      };
      xhr.onabort = () => {
        let headers = this._parseHeaders(xhr.getAllResponseHeaders());
        let response = this._transformResponse(xhr.response, headers);
        this._onCancelItem(item, response, xhr.status, headers);
        this._onCompleteItem(item, response, xhr.status, headers);
        res(response)
      };
      xhr.open(item.method, item.url, true);
      xhr.withCredentials = item.withCredentials;
      if (this.options.headers) {
        for (let header of this.options.headers) {
          xhr.setRequestHeader(header.name, header.value);
        }
      }
      if (item.headers.length) {
        for (let header of item.headers) {
          xhr.setRequestHeader(header.name, header.value);
        }
      }
      if (this.authToken) {
        xhr.setRequestHeader(this.authTokenHeader, this.authToken);
      }
      xhr.send(sendable);
      //this._render();
    })
  }

  protected _getTotalProgress(value:number = 0):number {
    if (this.options.removeAfterUpload) {
      return value;
    }
    let notUploaded = this.getNotUploadedItems().length;
    let uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
    let ratio = 100 / this.queue.length;
    let current = value * ratio / 100;
    return Math.round(uploaded * ratio + current);
  }

  protected _getFilters(filters?:FilterFunction[]|string):FilterFunction[] {
    if (!filters) {
      return this.options.filters;
    }
    if (Array.isArray(filters)) {
      return filters;
    }
    if (typeof filters === 'string') {
      let names = filters.match(/[^\s,]+/g);
      return this.options.filters
        .filter((filter:any) => names.indexOf(filter.name) !== -1);
    }
    return this.options.filters;
  }

  /*protected _render():any {
    return void 0;
    // todo: ?
  }*/

  protected _queueLimitFilter():boolean {
    return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
  }

  getFileFilterFailName(file:File|FileLikeObject):string{
    for(let x=this.options.filters.length-1; x >= 0; --x){
      if( !this.options.filters[x].fn.call(this, file, this.options) ){
        return this.options.filters[x].name
      }
    }
    return
  }

  _isValidFile(
    file:FileLikeObject,
    filters:FilterFunction[],
    options:FileUploaderOptions
  ):boolean {
    if(!filters.length)return true
    return this.getFileFilterFailName(file) ? false : true
  }

  _isSuccessCode(status:number):boolean {
    return (status >= 200 && status < 300) || status === 304;
  }

  /* tslint:disable */
  protected _transformResponse(response:string, headers:ParsedResponseHeaders):string {
    // todo: ?
    /*var headersGetter = this._headersGetter(headers);
     forEach($http.defaults.transformResponse, (transformFn) => {
     response = transformFn(response, headersGetter);
     });*/
    return response;
  }

  /* tslint:enable */
  protected _parseHeaders(headers:string):ParsedResponseHeaders {
    let parsed:any = {};
    let key:any;
    let val:any;
    let i:any;
    if (!headers) {
      return parsed;
    }
    headers.split('\n').map((line:any) => {
      i = line.indexOf(':');
      key = line.slice(0, i).trim().toLowerCase();
      val = line.slice(i + 1).trim();
      if (key) {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    });
    return parsed;
  }

  /*protected _iframeTransport(item:FileItem) {
   // todo: implement it later
   }*/

  protected _onWhenAddingFileFailed(item:FileLikeObject, filter:any, options:any):void {
    this.onWhenAddingFileFailed(item, filter, options);
  }

  protected _onAfterAddingFile(item:FileItem):void {
    this.onAfterAddingFile(item);
  }

  protected _onAfterAddingAll(items:any):void {
    this.onAfterAddingAll(items);
  }

  protected _onBeforeUploadItem(item:FileItem):void {
    item._onBeforeUpload();
    this.onBeforeUploadItem(item);
  }

  protected _onBuildItemForm(item:FileItem, form:any):void {
    item._onBuildForm(form);
    this.onBuildItemForm(item, form);
  }

  protected _onProgressItem(item:FileItem, progress:any):void {
    let total = this._getTotalProgress(progress);
    this.progress = total;
    item._onProgress(progress);
    this.onProgressItem(item, progress);
    this.onProgressAll(total);
    //this._render();
  }

  /* tslint:disable */
  protected _onSuccessItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):void {
    item._onSuccess(response, status, headers);
    this.onSuccessItem(item, response, status, headers);
  }

  /* tslint:enable */
  protected _onCancelItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):void {
    item._onCancel(response, status, headers);
    this.onCancelItem(item, response, status, headers);
  }

  /** converts file-input file into base64 dataUri */
  dataUrl(file:any, disallowObjectUrl?:any):Promise<string>{
    return dataUrl(file,disallowObjectUrl)
  }

  applyExifRotation(file:File):Promise<any>{
    if (file.type.indexOf('image/jpeg') !== 0) {
      return Promise.resolve(file);
    }

    return readOrientation(file)
    .then((result:orientationMeta)=>{
      if (result.orientation < 2 || result.orientation > 8) {
        return file
      }
      
      return fixFileOrientationByMeta(file,result)
    })
  }
}


/** converts file-input file into base64 dataUri */
function dataUrl(file:any, disallowObjectUrl?:any):Promise<string>{
  if (!file) return Promise.resolve(file)
  
  if ((disallowObjectUrl && file.$ngfDataUrl != null) || (!disallowObjectUrl && file.$ngfBlobUrl != null)) {
    return Promise.resolve( disallowObjectUrl ? file.$ngfDataUrl : file.$ngfBlobUrl )
  }

  var p = disallowObjectUrl ? file.$$ngfDataUrlPromise : file.$$ngfBlobUrlPromise;
  if (p) return p;

  const win = getWindow()
  let deferred:Promise<any> = Promise.resolve()
  if (win.FileReader && file &&
    (!win.FileAPI || navigator.userAgent.indexOf('MSIE 8') === -1 || file.size < 20000) &&
    (!win.FileAPI || navigator.userAgent.indexOf('MSIE 9') === -1 || file.size < 4000000)) {
    //prefer URL.createObjectURL for handling refrences to files of all sizes
    //since it doesn´t build a large string in memory
    var URL = win.URL || win.webkitURL;
    if (FileReader) {
      deferred = new Promise((res,rej)=>{
        var fileReader = new FileReader();
        fileReader.onload = function (event:any) {
          file.$ngfDataUrl = event.target.result;
          delete file.$ngfDataUrl;
          res( event.target.result )
        };
        fileReader.onerror = function (e) {
          file.$ngfDataUrl = '';
          rej(e)
        };
        fileReader.readAsDataURL(file);
      })
    } else {
      var url:any;
      try {
        url = URL.createObjectURL(file);
      } catch (e) {
        return Promise.reject(e);
      }
      
      deferred = deferred.then( ()=>url );
      file.$ngfBlobUrl = url;
    }
  } else {
    file[disallowObjectUrl ? '$ngfDataUrl' : '$ngfBlobUrl'] = '';
    return Promise.reject( new Error('Browser does not support window.FileReader, window.FileReader, or window.FileAPI') )//deferred.reject();
  }

  if (disallowObjectUrl) {
    p = file.$$ngfDataUrlPromise = deferred;
  } else {
    p = file.$$ngfBlobUrlPromise = deferred;
  }

  p = p.then((x:any)=>{
    delete file[disallowObjectUrl ? '$$ngfDataUrlPromise' : '$$ngfBlobUrlPromise'];
    return x
  })

  return p;
}

function fixFileOrientationByMeta(file:File, result:orientationMeta){
  return dataUrl(file, true)
  .then(url=>{
    var canvas = document.createElement('canvas');
    var img = document.createElement('img');

    return new Promise(function(res,rej){
      img.onload = function () {
        try {
          canvas.width = result.orientation > 4 ? img.height : img.width;
          canvas.height = result.orientation > 4 ? img.width : img.height;
          var ctx = canvas.getContext('2d');
          applyTransform(ctx, result.orientation, img.width, img.height);
          ctx.drawImage(img, 0, 0);
          var dataUrl = canvas.toDataURL(file.type || 'image/WebP', 0.934);
          const base = arrayBufferToBase64(result.fixedArrayBuffer)
          dataUrl = restoreExif(base, dataUrl);
          var blob = dataUrltoBlob(dataUrl, file.name);
          res(blob);
        } catch (e) {
          return rej(e);
        }
      };
      img.onerror = rej;
      img.src = url;    
    })
  })
}

function arrayBufferToBase64(buffer:any) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function restoreExif(orig:any, resized:any) {
  var ExifRestorer:any = {
    KEY_STR:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  }

  ExifRestorer.encode64 = function (input:any) {
    var output = '',
      chr1, chr2, chr3:any = '',
      enc1, enc2, enc3, enc4:any = '',
      i = 0;

    do {
      chr1 = input[i++];
      chr2 = input[i++];
      chr3 = input[i++];

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
        this.KEY_STR.charAt(enc1) +
        this.KEY_STR.charAt(enc2) +
        this.KEY_STR.charAt(enc3) +
        this.KEY_STR.charAt(enc4);
      chr1 = chr2 = chr3 = '';
      enc1 = enc2 = enc3 = enc4 = '';
    } while (i < input.length);

    return output;
  };

  ExifRestorer.restore = function (origFileBase64:any, resizedFileBase64:any) {
    if (origFileBase64.match('data:image/jpeg;base64,')) {
      origFileBase64 = origFileBase64.replace('data:image/jpeg;base64,', '');
    }

    var rawImage = this.decode64(origFileBase64);
    var segments = this.slice2Segments(rawImage);

    var image = this.exifManipulation(resizedFileBase64, segments);

    return 'data:image/jpeg;base64,' + this.encode64(image);
  };


  ExifRestorer.exifManipulation = function (resizedFileBase64:any, segments:any) {
    var exifArray = this.getExifArray(segments),
      newImageArray = this.insertExif(resizedFileBase64, exifArray);
    return new Uint8Array(newImageArray);
  };

  ExifRestorer.getExifArray = function (segments:number[][]) {
    var seg;
    for (var x = 0; x < segments.length; x++) {
      seg = segments[x];
      if (seg[0] === 255 && seg[1] === 225) //(ff e1)
      {
        return seg;
      }
    }
    return [];
  };


  ExifRestorer.insertExif = function (resizedFileBase64:any, exifArray:any) {
    var imageData = resizedFileBase64.replace('data:image/jpeg;base64,', ''),
      buf = this.decode64(imageData),
      separatePoint = buf.indexOf(255, 3),
      mae = buf.slice(0, separatePoint),
      ato = buf.slice(separatePoint),
      array = mae;

    array = array.concat(exifArray);
    array = array.concat(ato);
    return array;
  };


  ExifRestorer.slice2Segments = function (rawImageArray:any) {
    var head = 0,
      segments = [];

    while (1) {
      if (rawImageArray[head] === 255 && rawImageArray[head + 1] === 218) {
        break;
      }
      if (rawImageArray[head] === 255 && rawImageArray[head + 1] === 216) {
        head += 2;
      }
      else {
        var length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3],
          endPoint = head + length + 2,
          seg = rawImageArray.slice(head, endPoint);
        segments.push(seg);
        head = endPoint;
      }
      if (head > rawImageArray.length) {
        break;
      }
    }

    return segments;
  };


  ExifRestorer.decode64 = function (input:any) {
    var chr1, chr2, chr3:any = '',
      enc1, enc2, enc3, enc4:any = '',
      i = 0,
      buf = [];

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
      console.log('There were invalid base64 characters in the input text.');
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    do {
      enc1 = this.KEY_STR.indexOf(input.charAt(i++));
      enc2 = this.KEY_STR.indexOf(input.charAt(i++));
      enc3 = this.KEY_STR.indexOf(input.charAt(i++));
      enc4 = this.KEY_STR.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      buf.push(chr1);

      if (enc3 !== 64) {
        buf.push(chr2);
      }
      if (enc4 !== 64) {
        buf.push(chr3);
      }

      chr1 = chr2 = chr3 = '';
      enc1 = enc2 = enc3 = enc4 = '';

    } while (i < input.length);

    return buf;
  };

  return ExifRestorer.restore(orig, resized);  //<= EXIF
};

interface orientationMeta{
  orientation: number
  fixedArrayBuffer?:any[]
}

function readOrientation(file:File):Promise<orientationMeta>{
  return new Promise((res,rej)=>{
    var reader = new FileReader();
    var slicedFile = file.slice ? file.slice(0, 64 * 1024) : file;
    reader.readAsArrayBuffer(slicedFile);
    reader.onerror = rej
    reader.onload = function (e:any) {
      var result:orientationMeta = {orientation: 1};
      var view = new DataView(this.result);
      if (view.getUint16(0, false) !== 0xFFD8) return res(result);

      var length = view.byteLength,
        offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) return res(result);

          var little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              var orientation = view.getUint16(offset + (i * 12) + 8, little);
              if (orientation >= 2 && orientation <= 8) {
                view.setUint16(offset + (i * 12) + 8, 1, little);
                result.fixedArrayBuffer = e.target.result;
              }
              result.orientation = orientation;
              return res(result);
            }
        } else if ((marker & 0xFF00) !== 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return res(result);
    };
  })
};

function applyTransform(ctx:CanvasRenderingContext2D, orientation:number, width:number, height:number) {
  switch (orientation) {
    case 2:
      return ctx.transform(-1, 0, 0, 1, width, 0);
    case 3:
      return ctx.transform(-1, 0, 0, -1, width, height);
    case 4:
      return ctx.transform(1, 0, 0, -1, 0, height);
    case 5:
      return ctx.transform(0, 1, 1, 0, 0, 0);
    case 6:
      return ctx.transform(0, 1, -1, 0, height, 0);
    case 7:
      return ctx.transform(0, -1, -1, 0, height, width);
    case 8:
      return ctx.transform(0, -1, 1, 0, 0, width);
  }
}

function dataUrltoBlob(dataurl:string, name:string, origSize?:any):Blob{
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  var blob = new window.Blob([u8arr], {type: mime});
  blob["name"] = name;
  blob["$ngfOrigSize"] = origSize;
  return blob;
};
