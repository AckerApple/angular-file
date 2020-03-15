import { __decorate } from 'tslib';
import { EventEmitter, ElementRef, Input, Output, HostListener, Directive, IterableDiffers, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const isFileInput = function (elm) {
    const ty = elm.getAttribute('type');
    return elm.tagName.toLowerCase() === 'input' && ty && ty.toLowerCase() === 'file';
};
let initialTouchStartY = 0;
let initialTouchStartX = 0;
const detectSwipe = function (evt) {
    var touches = evt.changedTouches || (evt.originalEvent && evt.originalEvent.changedTouches);
    if (touches) {
        if (evt.type === 'touchstart') {
            initialTouchStartX = touches[0].clientX;
            initialTouchStartY = touches[0].clientY;
            return true; // don't block event default
        }
        else {
            // prevent scroll from triggering event
            if (evt.type === 'touchend') {
                var currentX = touches[0].clientX;
                var currentY = touches[0].clientY;
                if ((Math.abs(currentX - initialTouchStartX) > 20) ||
                    (Math.abs(currentY - initialTouchStartY) > 20)) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    return false;
                }
            }
            return true;
        }
    }
    return false;
};
const createInvisibleFileInputWrap = function () {
    var fileElem = createFileInput();
    var label = document.createElement('label');
    label.innerHTML = 'upload';
    label.style.visibility = 'hidden';
    label.style.position = 'absolute';
    label.style.overflow = 'hidden';
    label.style.width = '0px';
    label.style.height = '0px';
    label.style.border = 'none';
    label.style.margin = '0px';
    label.style.padding = '0px';
    label.setAttribute('tabindex', '-1');
    //bindAttrToFileInput(fileElem, label);
    //generatedElems.push({el: elem, ref: label});
    label.appendChild(fileElem);
    //document.body.appendChild( label );
    return label;
};
const createFileInput = function () {
    var fileElem = document.createElement('input');
    fileElem.type = "file";
    return fileElem;
};

function getWindow() { return window; }
function acceptType(accept, type, name) {
    if (!accept) {
        return true;
    }
    const defs = accept.split(',');
    let regx;
    let acceptRegString;
    for (let x = defs.length - 1; x >= 0; --x) {
        //Escapes dots in mimetype 
        acceptRegString = defs[x];
        //trim
        acceptRegString = acceptRegString.replace(/(^\s+|\s+$)/g, '');
        //Escapes stars in mimetype 
        acceptRegString = acceptRegString.replace(/\*/g, '.*');
        //let acceptReg = '^((' + acceptRegString
        //acceptReg = acceptReg.replace(/,/g,')|(') + '))$'
        //try by mime
        regx = new RegExp(acceptRegString, 'gi');
        if (type.search(regx) >= 0) {
            return true;
        }
        //try by ext
        if (acceptRegString.substring(0, 1) == '.') {
            acceptRegString = '\\' + acceptRegString; //.substring(1, acceptRegString.length-1)//remove dot at front
            regx = new RegExp(acceptRegString + '$', 'i');
            if ((name || type).search(regx) >= 0) {
                return true;
            }
        }
    }
    return false;
}
function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
function dataUrltoBlob(dataurl, name, origSize) {
    var arr = dataurl.split(',');
    var mimeMatch = arr[0].match(/:(.*?);/);
    var mime = mimeMatch ? mimeMatch[1] : 'text/plain';
    var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    var blob = new window.Blob([u8arr], { type: mime });
    blob["name"] = name;
    blob["$ngfOrigSize"] = origSize;
    return blob;
}
function applyTransform(ctx, orientation, width, height) {
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
function fixFileOrientationByMeta(file, result) {
    return dataUrl(file, true)
        .then(url => {
        var canvas = document.createElement('canvas');
        var img = document.createElement('img');
        return new Promise(function (res, rej) {
            img.onload = function () {
                try {
                    canvas.width = result.orientation > 4 ? img.height : img.width;
                    canvas.height = result.orientation > 4 ? img.width : img.height;
                    var ctx = canvas.getContext('2d');
                    applyTransform(ctx, result.orientation, img.width, img.height);
                    ctx.drawImage(img, 0, 0);
                    var dataUrl = canvas.toDataURL(file.type || 'image/WebP', 0.934);
                    const base = arrayBufferToBase64(result.fixedArrayBuffer);
                    dataUrl = restoreExif(base, dataUrl);
                    var blob = dataUrltoBlob(dataUrl, file.name);
                    const newFile = blobToFile(blob, file.name);
                    res(newFile);
                }
                catch (e) {
                    rej(e);
                }
            };
            img.onerror = rej;
            img.src = url;
        });
    });
}
function applyExifRotation(file) {
    if (file.type.indexOf('image/jpeg') !== 0) {
        return Promise.resolve(file);
    }
    return readOrientation(file)
        .then((result) => {
        if (result.orientation < 2 || result.orientation > 8) {
            return file;
        }
        return fixFileOrientationByMeta(file, result);
    });
}
function readOrientation(file) {
    return new Promise((res, rej) => {
        var reader = new FileReader();
        var slicedFile = file.slice ? file.slice(0, 64 * 1024) : file;
        reader.readAsArrayBuffer(slicedFile);
        reader.onerror = rej;
        reader.onload = function (e) {
            var result = { orientation: 1 };
            var view = new DataView(this.result);
            if (view.getUint16(0, false) !== 0xFFD8)
                return res(result);
            var length = view.byteLength, offset = 2;
            while (offset < length) {
                var marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xFFE1) {
                    if (view.getUint32(offset += 2, false) !== 0x45786966)
                        return res(result);
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
                }
                else if ((marker & 0xFF00) !== 0xFF00)
                    break;
                else
                    offset += view.getUint16(offset, false);
            }
            return res(result);
        };
    });
}
/** converts file-input file into base64 dataUri */
function dataUrl(file, disallowObjectUrl) {
    if (!file)
        return Promise.resolve(file);
    if ((disallowObjectUrl && file.$ngfDataUrl != null) || (!disallowObjectUrl && file.$ngfBlobUrl != null)) {
        return Promise.resolve(disallowObjectUrl ? file.$ngfDataUrl : file.$ngfBlobUrl);
    }
    var p = disallowObjectUrl ? file.$$ngfDataUrlPromise : file.$$ngfBlobUrlPromise;
    if (p)
        return p;
    const win = getWindow();
    let deferred;
    if (win.FileReader && file &&
        (!win.FileAPI || navigator.userAgent.indexOf('MSIE 8') === -1 || file.size < 20000) &&
        (!win.FileAPI || navigator.userAgent.indexOf('MSIE 9') === -1 || file.size < 4000000)) {
        //prefer URL.createObjectURL for handling refrences to files of all sizes
        //since it doesn´t build a large string in memory
        var URL = win.URL || win.webkitURL;
        if (FileReader) {
            deferred = new Promise((res, rej) => {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    file.$ngfDataUrl = event.target.result;
                    delete file.$ngfDataUrl;
                    res(event.target.result);
                };
                fileReader.onerror = function (e) {
                    file.$ngfDataUrl = '';
                    rej(e);
                };
                fileReader.readAsDataURL(file);
            });
        }
        else {
            var url;
            try {
                url = URL.createObjectURL(file);
            }
            catch (e) {
                return Promise.reject(e);
            }
            deferred = Promise.resolve(url);
            file.$ngfBlobUrl = url;
        }
    }
    else {
        file[disallowObjectUrl ? '$ngfDataUrl' : '$ngfBlobUrl'] = '';
        return Promise.reject(new Error('Browser does not support window.FileReader, window.FileReader, or window.FileAPI')); //deferred.reject();
    }
    if (disallowObjectUrl) {
        p = file.$$ngfDataUrlPromise = deferred;
    }
    else {
        p = file.$$ngfBlobUrlPromise = deferred;
    }
    p = p.then((x) => {
        delete file[disallowObjectUrl ? '$$ngfDataUrlPromise' : '$$ngfBlobUrlPromise'];
        return x;
    });
    return p;
}
function restoreExif(orig, resized) {
    var ExifRestorer = {
        KEY_STR: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    };
    ExifRestorer.encode64 = function (input) {
        var output = '', chr1, chr2, chr3 = '', enc1, enc2, enc3, enc4 = '', i = 0;
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
            }
            else if (isNaN(chr3)) {
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
    ExifRestorer.restore = function (origFileBase64, resizedFileBase64) {
        if (origFileBase64.match('data:image/jpeg;base64,')) {
            origFileBase64 = origFileBase64.replace('data:image/jpeg;base64,', '');
        }
        var rawImage = this.decode64(origFileBase64);
        var segments = this.slice2Segments(rawImage);
        var image = this.exifManipulation(resizedFileBase64, segments);
        return 'data:image/jpeg;base64,' + this.encode64(image);
    };
    ExifRestorer.exifManipulation = function (resizedFileBase64, segments) {
        var exifArray = this.getExifArray(segments), newImageArray = this.insertExif(resizedFileBase64, exifArray);
        return new Uint8Array(newImageArray);
    };
    ExifRestorer.getExifArray = function (segments) {
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
    ExifRestorer.insertExif = function (resizedFileBase64, exifArray) {
        var imageData = resizedFileBase64.replace('data:image/jpeg;base64,', ''), buf = this.decode64(imageData), separatePoint = buf.indexOf(255, 3), mae = buf.slice(0, separatePoint), ato = buf.slice(separatePoint), array = mae;
        array = array.concat(exifArray);
        array = array.concat(ato);
        return array;
    };
    ExifRestorer.slice2Segments = function (rawImageArray) {
        var head = 0, segments = [];
        while (1) {
            if (rawImageArray[head] === 255 && rawImageArray[head + 1] === 218) {
                break;
            }
            if (rawImageArray[head] === 255 && rawImageArray[head + 1] === 216) {
                head += 2;
            }
            else {
                var length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
                var endPoint = head + length + 2;
                var seg = rawImageArray.slice(head, endPoint);
                segments.push(seg);
                head = endPoint;
            }
            if (head > rawImageArray.length) {
                break;
            }
        }
        return segments;
    };
    ExifRestorer.decode64 = function (input) {
        var chr1, chr2, chr3 = '', enc1, enc2, enc3, enc4 = '', i = 0, buf = [];
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
    return ExifRestorer.restore(orig, resized); //<= EXIF
}
;
function blobToFile(theBlob, fileName) {
    var b = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
    //Cast to a File() type
    return theBlob;
}

/** A master base set of logic intended to support file select/drag/drop operations
 NOTE: Use ngfDrop for full drag/drop. Use ngfSelect for selecting
*/
let ngf = class ngf {
    constructor(element) {
        this.element = element;
        this.filters = [];
        this.lastFileCount = 0;
        //@Input() forceFilename:string
        //@Input() forcePostname:string
        this.ngfFixOrientation = true;
        this.fileDropDisabled = false;
        this.selectable = false;
        this.directiveInit = new EventEmitter();
        this.lastInvalids = [];
        this.lastInvalidsChange = new EventEmitter();
        this.lastBaseUrlChange = new EventEmitter();
        this.fileChange = new EventEmitter();
        this.files = [];
        this.filesChange = new EventEmitter();
        this.initFilters();
    }
    initFilters() {
        // the order is important
        this.filters.push({ name: 'accept', fn: this._acceptFilter });
        this.filters.push({ name: 'fileSize', fn: this._fileSizeFilter });
        //this.filters.push({name: 'fileType', fn: this._fileTypeFilter})
        //this.filters.push({name: 'queueLimit', fn: this._queueLimitFilter})
        //this.filters.push({name: 'mimeType', fn: this._mimeTypeFilter})
    }
    ngOnDestroy() {
        delete this.fileElm; //faster memory release of dom element
    }
    ngOnInit() {
        if (this.selectable) {
            this.enableSelecting();
        }
        if (this.multiple) {
            this.paramFileElm().setAttribute('multiple', this.multiple);
        }
        //create reference to this class with one cycle delay to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
            this.directiveInit.emit(this);
        }, 0);
    }
    ngOnChanges(changes) {
        if (changes.accept) {
            this.paramFileElm().setAttribute('accept', changes.accept.currentValue || '*');
        }
    }
    paramFileElm() {
        if (this.fileElm)
            return this.fileElm; //already defined
        //elm is a file input
        const isFile = isFileInput(this.element.nativeElement);
        if (isFile)
            return this.fileElm = this.element.nativeElement;
        //create foo file input
        const label = createInvisibleFileInputWrap();
        this.fileElm = label.getElementsByTagName('input')[0];
        this.fileElm.addEventListener('change', this.changeFn.bind(this));
        this.element.nativeElement.appendChild(label);
        return this.fileElm;
    }
    enableSelecting() {
        let elm = this.element.nativeElement;
        if (isFileInput(elm)) {
            const bindedHandler = _ev => this.beforeSelect();
            elm.addEventListener('click', bindedHandler);
            elm.addEventListener('touchstart', bindedHandler);
            return;
        }
        const bindedHandler = ev => this.clickHandler(ev);
        elm.addEventListener('click', bindedHandler);
        elm.addEventListener('touchstart', bindedHandler);
        elm.addEventListener('touchend', bindedHandler);
    }
    getValidFiles(files) {
        const rtn = [];
        for (let x = files.length - 1; x >= 0; --x) {
            if (this.isFileValid(files[x])) {
                rtn.push(files[x]);
            }
        }
        return rtn;
    }
    getInvalidFiles(files) {
        const rtn = [];
        for (let x = files.length - 1; x >= 0; --x) {
            let failReason = this.getFileFilterFailName(files[x]);
            if (failReason) {
                rtn.push({
                    file: files[x],
                    type: failReason
                });
            }
        }
        return rtn;
    }
    handleFiles(files) {
        const valids = this.getValidFiles(files);
        if (files.length != valids.length) {
            this.lastInvalids = this.getInvalidFiles(files);
        }
        else {
            delete this.lastInvalids;
        }
        this.lastInvalidsChange.emit(this.lastInvalids);
        if (valids.length) {
            if (this.ngfFixOrientation) {
                this.applyExifRotations(valids)
                    .then(fixedFiles => this.que(fixedFiles));
            }
            else {
                this.que(valids);
            }
        }
        if (this.isEmptyAfterSelection()) {
            this.element.nativeElement.value = '';
        }
    }
    que(files) {
        this.files = this.files || [];
        Array.prototype.push.apply(this.files, files);
        //below break memory ref and doesnt act like a que
        //this.files = files//causes memory change which triggers bindings like <ngfFormData [files]="files"></ngfFormData>
        this.filesChange.emit(this.files);
        if (files.length) {
            this.fileChange.emit(this.file = files[0]);
            if (this.lastBaseUrlChange.observers.length) {
                dataUrl(files[0])
                    .then(url => this.lastBaseUrlChange.emit(url));
            }
        }
        //will be checked for input value clearing
        this.lastFileCount = this.files.length;
    }
    /** called when input has files */
    changeFn(event) {
        var fileList = event.__files_ || (event.target && event.target.files);
        if (!fileList)
            return;
        this.stopEvent(event);
        this.handleFiles(fileList);
    }
    clickHandler(evt) {
        const elm = this.element.nativeElement;
        if (elm.getAttribute('disabled') || this.fileDropDisabled) {
            return false;
        }
        var r = detectSwipe(evt);
        // prevent the click if it is a swipe
        if (r !== false)
            return r;
        const fileElm = this.paramFileElm();
        fileElm.click();
        //fileElm.dispatchEvent( new Event('click') );
        this.beforeSelect();
        return false;
    }
    beforeSelect() {
        if (this.files && this.lastFileCount === this.files.length)
            return;
        //if no files in array, be sure browser doesnt prevent reselect of same file (see github issue 27)
        this.fileElm.value = null;
    }
    isEmptyAfterSelection() {
        return !!this.element.nativeElement.attributes.multiple;
    }
    eventToTransfer(event) {
        if (event.dataTransfer)
            return event.dataTransfer;
        return event.originalEvent ? event.originalEvent.dataTransfer : null;
    }
    stopEvent(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    transferHasFiles(transfer) {
        if (!transfer.types) {
            return false;
        }
        if (transfer.types.indexOf) {
            return transfer.types.indexOf('Files') !== -1;
        }
        else if (transfer.types.contains) {
            return transfer.types.contains('Files');
        }
        else {
            return false;
        }
    }
    eventToFiles(event) {
        const transfer = this.eventToTransfer(event);
        if (transfer) {
            if (transfer.files && transfer.files.length) {
                return transfer.files;
            }
            if (transfer.items && transfer.items.length) {
                return transfer.items;
            }
        }
        return [];
    }
    applyExifRotations(files) {
        const mapper = (file, index) => {
            return applyExifRotation(file)
                .then(fixedFile => files.splice(index, 1, fixedFile));
        };
        const proms = [];
        for (let x = files.length - 1; x >= 0; --x) {
            proms[x] = mapper(files[x], x);
        }
        return Promise.all(proms).then(() => files);
    }
    onChange(event) {
        let files = this.element.nativeElement.files || this.eventToFiles(event);
        if (!files.length)
            return;
        this.stopEvent(event);
        this.handleFiles(files);
    }
    getFileFilterFailName(file) {
        for (let i = 0; i < this.filters.length; i++) {
            if (!this.filters[i].fn.call(this, file)) {
                return this.filters[i].name;
            }
        }
        return undefined;
    }
    isFileValid(file) {
        const noFilters = !this.accept && (!this.filters || !this.filters.length);
        if (noFilters) {
            return true; //we have no filters so all files are valid
        }
        return this.getFileFilterFailName(file) ? false : true;
    }
    isFilesValid(files) {
        for (let x = files.length - 1; x >= 0; --x) {
            if (!this.isFileValid(files[x])) {
                return false;
            }
        }
        return true;
    }
    _acceptFilter(item) {
        return acceptType(this.accept, item.type, item.name);
    }
    _fileSizeFilter(item) {
        return !(this.maxSize && item.size > this.maxSize);
    }
    /** browsers try hard to conceal data about file drags, this tends to undo that */
    filesToWriteableObject(files) {
        const jsonFiles = [];
        for (let x = 0; x < files.length; ++x) {
            jsonFiles.push({
                type: files[x].type,
                kind: files[x]["kind"]
            });
        }
        return jsonFiles;
    }
};
ngf.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], ngf.prototype, "multiple", void 0);
__decorate([
    Input()
], ngf.prototype, "accept", void 0);
__decorate([
    Input()
], ngf.prototype, "maxSize", void 0);
__decorate([
    Input()
], ngf.prototype, "ngfFixOrientation", void 0);
__decorate([
    Input()
], ngf.prototype, "fileDropDisabled", void 0);
__decorate([
    Input()
], ngf.prototype, "selectable", void 0);
__decorate([
    Output('init')
], ngf.prototype, "directiveInit", void 0);
__decorate([
    Input()
], ngf.prototype, "lastInvalids", void 0);
__decorate([
    Output()
], ngf.prototype, "lastInvalidsChange", void 0);
__decorate([
    Input()
], ngf.prototype, "lastBaseUrl", void 0);
__decorate([
    Output()
], ngf.prototype, "lastBaseUrlChange", void 0);
__decorate([
    Input()
], ngf.prototype, "file", void 0);
__decorate([
    Output()
], ngf.prototype, "fileChange", void 0);
__decorate([
    Input()
], ngf.prototype, "files", void 0);
__decorate([
    Output()
], ngf.prototype, "filesChange", void 0);
__decorate([
    HostListener('change', ['$event'])
], ngf.prototype, "onChange", null);
ngf = __decorate([
    Directive({
        selector: "[ngf]",
        exportAs: "ngf"
    })
], ngf);

let ngfSelect = class ngfSelect extends ngf {
    constructor() {
        super(...arguments);
        this.selectable = true;
    }
};
__decorate([
    Input()
], ngfSelect.prototype, "selectable", void 0);
ngfSelect = __decorate([
    Directive({
        selector: "[ngfSelect]",
        exportAs: "ngfSelect"
    })
], ngfSelect);

let ngfDrop = class ngfDrop extends ngf {
    constructor() {
        super(...arguments);
        this.fileOver = new EventEmitter();
        this.validDrag = false;
        this.validDragChange = new EventEmitter();
        this.invalidDrag = false;
        this.invalidDragChange = new EventEmitter();
        this.dragFilesChange = new EventEmitter();
    }
    onDrop(event) {
        if (this.fileDropDisabled) {
            this.stopEvent(event);
            return;
        }
        this.closeDrags();
        let files = this.eventToFiles(event);
        if (!files.length)
            return;
        this.stopEvent(event);
        this.handleFiles(files);
    }
    handleFiles(files) {
        this.fileOver.emit(false); //turn-off dragover
        super.handleFiles(files);
    }
    onDragOver(event) {
        if (this.fileDropDisabled) {
            this.stopEvent(event);
            return;
        }
        const transfer = this.eventToTransfer(event);
        let files = this.eventToFiles(event);
        let jsonFiles = this.filesToWriteableObject(files);
        this.dragFilesChange.emit(this.dragFiles = jsonFiles);
        if (files.length) {
            this.validDrag = this.isFilesValid(files);
        }
        else {
            //Safari, IE11 & some browsers do NOT tell you about dragged files until dropped. Always consider a valid drag
            this.validDrag = true;
        }
        this.validDragChange.emit(this.validDrag);
        this.invalidDrag = !this.validDrag;
        this.invalidDragChange.emit(this.invalidDrag);
        transfer.dropEffect = 'copy'; //change cursor and such
        this.stopEvent(event);
        this.fileOver.emit(true);
    }
    closeDrags() {
        delete this.validDrag;
        this.validDragChange.emit(this.validDrag);
        this.invalidDrag = false;
        this.invalidDragChange.emit(this.invalidDrag);
        delete this.dragFiles;
        this.dragFilesChange.emit(this.dragFiles);
    }
    onDragLeave(event) {
        if (this.fileDropDisabled) {
            this.stopEvent(event);
            return;
        }
        this.closeDrags();
        if (this.element) {
            if (event.currentTarget === this.element[0]) {
                return;
            }
        }
        this.stopEvent(event);
        this.fileOver.emit(false);
    }
};
__decorate([
    Output()
], ngfDrop.prototype, "fileOver", void 0);
__decorate([
    Input()
], ngfDrop.prototype, "validDrag", void 0);
__decorate([
    Output()
], ngfDrop.prototype, "validDragChange", void 0);
__decorate([
    Input()
], ngfDrop.prototype, "invalidDrag", void 0);
__decorate([
    Output()
], ngfDrop.prototype, "invalidDragChange", void 0);
__decorate([
    Input()
], ngfDrop.prototype, "dragFiles", void 0);
__decorate([
    Output()
], ngfDrop.prototype, "dragFilesChange", void 0);
__decorate([
    HostListener('drop', ['$event'])
], ngfDrop.prototype, "onDrop", null);
__decorate([
    HostListener('dragover', ['$event'])
], ngfDrop.prototype, "onDragOver", null);
__decorate([
    HostListener('dragleave', ['$event'])
], ngfDrop.prototype, "onDragLeave", null);
ngfDrop = __decorate([
    Directive({
        selector: "[ngfDrop]",
        exportAs: "ngfDrop"
    })
], ngfDrop);

let ngfBackground = class ngfBackground {
    constructor(ElementRef) {
        this.ElementRef = ElementRef;
    }
    ngOnChanges(_changes) {
        dataUrl(this.file)
            .then(src => {
            const urlString = 'url(\'' + (src || '') + '\')';
            this.ElementRef.nativeElement.style.backgroundImage = urlString;
        });
    }
};
ngfBackground.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input('ngfBackground')
], ngfBackground.prototype, "file", void 0);
ngfBackground = __decorate([
    Directive({ selector: '[ngfBackground]' })
], ngfBackground);

let ngfUploadStatus = class ngfUploadStatus {
    constructor() {
        this.percent = 0;
        this.percentChange = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes.httpEvent && changes.httpEvent.currentValue) {
            const event = changes.httpEvent.currentValue;
            if (event.loaded && event.total) {
                setTimeout(() => {
                    this.percent = Math.round(100 * event.loaded / event.total);
                    this.percentChange.emit(this.percent);
                }, 0);
            }
        }
    }
};
__decorate([
    Input()
], ngfUploadStatus.prototype, "percent", void 0);
__decorate([
    Output()
], ngfUploadStatus.prototype, "percentChange", void 0);
__decorate([
    Input()
], ngfUploadStatus.prototype, "httpEvent", void 0);
ngfUploadStatus = __decorate([
    Directive({ selector: 'ngfUploadStatus' })
], ngfUploadStatus);

let ngfFormData = class ngfFormData {
    constructor(IterableDiffers) {
        this.postName = "file";
        this.FormData = new FormData();
        this.FormDataChange = new EventEmitter();
        this.differ = IterableDiffers.find([]).create();
    }
    ngDoCheck() {
        var changes = this.differ.diff(this.files);
        if (changes) {
            setTimeout(() => this.buildFormData(), 0);
        }
    }
    buildFormData() {
        const isArray = typeof (this.files) === 'object' && this.files.constructor === Array;
        if (isArray) {
            this.FormData = new FormData();
            const files = this.files || [];
            files.forEach(file => this.FormData.append(this.postName, file, this.fileName || file.name));
            this.FormDataChange.emit(this.FormData);
        }
        else {
            delete this.FormData;
        }
    }
};
ngfFormData.ctorParameters = () => [
    { type: IterableDiffers }
];
__decorate([
    Input()
], ngfFormData.prototype, "files", void 0);
__decorate([
    Input()
], ngfFormData.prototype, "postName", void 0);
__decorate([
    Input()
], ngfFormData.prototype, "fileName", void 0);
__decorate([
    Input()
], ngfFormData.prototype, "FormData", void 0);
__decorate([
    Output()
], ngfFormData.prototype, "FormDataChange", void 0);
ngfFormData = __decorate([
    Directive({ selector: 'ngfFormData' })
], ngfFormData);

let ngfSrc = class ngfSrc {
    constructor(ElementRef) {
        this.ElementRef = ElementRef;
    }
    ngOnChanges(_changes) {
        dataUrl(this.file)
            .then(src => this.ElementRef.nativeElement.src = src);
    }
};
ngfSrc.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input('ngfSrc')
], ngfSrc.prototype, "file", void 0);
ngfSrc = __decorate([
    Directive({ selector: '[ngfSrc]' })
], ngfSrc);

//import{ HttpModule } from '@angular/http';
const declarations = [
    ngfDrop,
    ngfSelect,
    ngfBackground,
    ngfSrc,
    ngfUploadStatus,
    ngfFormData,
    ngf
];
let ngfModule = class ngfModule {
};
ngfModule = __decorate([
    NgModule({
        imports: [
            CommonModule
            //,HttpModule
        ],
        declarations: declarations,
        exports: declarations //[HttpModule, ...declarations]
    })
], ngfModule);

/**
 * Generated bundle index. Do not edit.
 */

export { ngf, ngfBackground, ngfDrop, ngfFormData, ngfModule, ngfSelect, ngfSrc, ngfUploadStatus };
//# sourceMappingURL=angular-file.js.map
