(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-file', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory(global['angular-file'] = {}, global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var isFileInput = function (elm) {
        var ty = elm.getAttribute('type');
        return elm.tagName.toLowerCase() === 'input' && ty && ty.toLowerCase() === 'file';
    };
    var initialTouchStartY = 0;
    var initialTouchStartX = 0;
    var detectSwipe = function (evt) {
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
    var createInvisibleFileInputWrap = function () {
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
    var createFileInput = function () {
        var fileElem = document.createElement('input');
        fileElem.type = "file";
        return fileElem;
    };

    function getWindow() { return window; }
    function acceptType(accept, type, name) {
        if (!accept) {
            return true;
        }
        var defs = accept.split(',');
        var regx;
        var acceptRegString;
        for (var x = defs.length - 1; x >= 0; --x) {
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
            .then(function (url) {
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
                        var base = arrayBufferToBase64(result.fixedArrayBuffer);
                        dataUrl = restoreExif(base, dataUrl);
                        var blob = dataUrltoBlob(dataUrl, file.name);
                        var newFile = blobToFile(blob, file.name);
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
            .then(function (result) {
            if (result.orientation < 2 || result.orientation > 8) {
                return file;
            }
            return fixFileOrientationByMeta(file, result);
        });
    }
    function readOrientation(file) {
        return new Promise(function (res, rej) {
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
        var win = getWindow();
        var deferred;
        if (win.FileReader && file &&
            (!win.FileAPI || navigator.userAgent.indexOf('MSIE 8') === -1 || file.size < 20000) &&
            (!win.FileAPI || navigator.userAgent.indexOf('MSIE 9') === -1 || file.size < 4000000)) {
            //prefer URL.createObjectURL for handling refrences to files of all sizes
            //since it doesn´t build a large string in memory
            var URL = win.URL || win.webkitURL;
            if (FileReader) {
                deferred = new Promise(function (res, rej) {
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
        p = p.then(function (x) {
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
    var ngf = /** @class */ (function () {
        function ngf(element) {
            this.element = element;
            this.filters = [];
            this.lastFileCount = 0;
            //@Input() forceFilename:string
            //@Input() forcePostname:string
            this.ngfFixOrientation = true;
            this.fileDropDisabled = false;
            this.selectable = false;
            this.directiveInit = new core.EventEmitter();
            this.lastInvalids = [];
            this.lastInvalidsChange = new core.EventEmitter();
            this.lastBaseUrlChange = new core.EventEmitter();
            this.fileChange = new core.EventEmitter();
            this.files = [];
            this.filesChange = new core.EventEmitter();
            this.initFilters();
        }
        ngf.prototype.initFilters = function () {
            // the order is important
            this.filters.push({ name: 'accept', fn: this._acceptFilter });
            this.filters.push({ name: 'fileSize', fn: this._fileSizeFilter });
            //this.filters.push({name: 'fileType', fn: this._fileTypeFilter})
            //this.filters.push({name: 'queueLimit', fn: this._queueLimitFilter})
            //this.filters.push({name: 'mimeType', fn: this._mimeTypeFilter})
        };
        ngf.prototype.ngOnDestroy = function () {
            delete this.fileElm; //faster memory release of dom element
        };
        ngf.prototype.ngOnInit = function () {
            var _this = this;
            if (this.selectable) {
                this.enableSelecting();
            }
            if (this.multiple) {
                this.paramFileElm().setAttribute('multiple', this.multiple);
            }
            //create reference to this class with one cycle delay to avoid ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(function () {
                _this.directiveInit.emit(_this);
            }, 0);
        };
        ngf.prototype.ngOnChanges = function (changes) {
            if (changes.accept) {
                this.paramFileElm().setAttribute('accept', changes.accept.currentValue || '*');
            }
        };
        ngf.prototype.paramFileElm = function () {
            if (this.fileElm)
                return this.fileElm; //already defined
            //elm is a file input
            var isFile = isFileInput(this.element.nativeElement);
            if (isFile)
                return this.fileElm = this.element.nativeElement;
            //create foo file input
            var label = createInvisibleFileInputWrap();
            this.fileElm = label.getElementsByTagName('input')[0];
            this.fileElm.addEventListener('change', this.changeFn.bind(this));
            this.element.nativeElement.appendChild(label);
            return this.fileElm;
        };
        ngf.prototype.enableSelecting = function () {
            var _this = this;
            var elm = this.element.nativeElement;
            if (isFileInput(elm)) {
                var bindedHandler_1 = function (_ev) { return _this.beforeSelect(); };
                elm.addEventListener('click', bindedHandler_1);
                elm.addEventListener('touchstart', bindedHandler_1);
                return;
            }
            var bindedHandler = function (ev) { return _this.clickHandler(ev); };
            elm.addEventListener('click', bindedHandler);
            elm.addEventListener('touchstart', bindedHandler);
            elm.addEventListener('touchend', bindedHandler);
        };
        ngf.prototype.getValidFiles = function (files) {
            var rtn = [];
            for (var x = files.length - 1; x >= 0; --x) {
                if (this.isFileValid(files[x])) {
                    rtn.push(files[x]);
                }
            }
            return rtn;
        };
        ngf.prototype.getInvalidFiles = function (files) {
            var rtn = [];
            for (var x = files.length - 1; x >= 0; --x) {
                var failReason = this.getFileFilterFailName(files[x]);
                if (failReason) {
                    rtn.push({
                        file: files[x],
                        type: failReason
                    });
                }
            }
            return rtn;
        };
        ngf.prototype.handleFiles = function (files) {
            var _this = this;
            var valids = this.getValidFiles(files);
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
                        .then(function (fixedFiles) { return _this.que(fixedFiles); });
                }
                else {
                    this.que(valids);
                }
            }
            if (this.isEmptyAfterSelection()) {
                this.element.nativeElement.value = '';
            }
        };
        ngf.prototype.que = function (files) {
            var _this = this;
            this.files = this.files || [];
            Array.prototype.push.apply(this.files, files);
            //below break memory ref and doesnt act like a que
            //this.files = files//causes memory change which triggers bindings like <ngfFormData [files]="files"></ngfFormData>
            this.filesChange.emit(this.files);
            if (files.length) {
                this.fileChange.emit(this.file = files[0]);
                if (this.lastBaseUrlChange.observers.length) {
                    dataUrl(files[0])
                        .then(function (url) { return _this.lastBaseUrlChange.emit(url); });
                }
            }
            //will be checked for input value clearing
            this.lastFileCount = this.files.length;
        };
        /** called when input has files */
        ngf.prototype.changeFn = function (event) {
            var fileList = event.__files_ || (event.target && event.target.files);
            if (!fileList)
                return;
            this.stopEvent(event);
            this.handleFiles(fileList);
        };
        ngf.prototype.clickHandler = function (evt) {
            var elm = this.element.nativeElement;
            if (elm.getAttribute('disabled') || this.fileDropDisabled) {
                return false;
            }
            var r = detectSwipe(evt);
            // prevent the click if it is a swipe
            if (r !== false)
                return r;
            var fileElm = this.paramFileElm();
            fileElm.click();
            //fileElm.dispatchEvent( new Event('click') );
            this.beforeSelect();
            return false;
        };
        ngf.prototype.beforeSelect = function () {
            if (this.files && this.lastFileCount === this.files.length)
                return;
            //if no files in array, be sure browser doesnt prevent reselect of same file (see github issue 27)
            this.fileElm.value = null;
        };
        ngf.prototype.isEmptyAfterSelection = function () {
            return !!this.element.nativeElement.attributes.multiple;
        };
        ngf.prototype.eventToTransfer = function (event) {
            if (event.dataTransfer)
                return event.dataTransfer;
            return event.originalEvent ? event.originalEvent.dataTransfer : null;
        };
        ngf.prototype.stopEvent = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        ngf.prototype.transferHasFiles = function (transfer) {
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
        };
        ngf.prototype.eventToFiles = function (event) {
            var transfer = this.eventToTransfer(event);
            if (transfer) {
                if (transfer.files && transfer.files.length) {
                    return transfer.files;
                }
                if (transfer.items && transfer.items.length) {
                    return transfer.items;
                }
            }
            return [];
        };
        ngf.prototype.applyExifRotations = function (files) {
            var mapper = function (file, index) {
                return applyExifRotation(file)
                    .then(function (fixedFile) { return files.splice(index, 1, fixedFile); });
            };
            var proms = [];
            for (var x = files.length - 1; x >= 0; --x) {
                proms[x] = mapper(files[x], x);
            }
            return Promise.all(proms).then(function () { return files; });
        };
        ngf.prototype.onChange = function (event) {
            var files = this.element.nativeElement.files || this.eventToFiles(event);
            if (!files.length)
                return;
            this.stopEvent(event);
            this.handleFiles(files);
        };
        ngf.prototype.getFileFilterFailName = function (file) {
            for (var i = 0; i < this.filters.length; i++) {
                if (!this.filters[i].fn.call(this, file)) {
                    return this.filters[i].name;
                }
            }
            return undefined;
        };
        ngf.prototype.isFileValid = function (file) {
            var noFilters = !this.accept && (!this.filters || !this.filters.length);
            if (noFilters) {
                return true; //we have no filters so all files are valid
            }
            return this.getFileFilterFailName(file) ? false : true;
        };
        ngf.prototype.isFilesValid = function (files) {
            for (var x = files.length - 1; x >= 0; --x) {
                if (!this.isFileValid(files[x])) {
                    return false;
                }
            }
            return true;
        };
        ngf.prototype._acceptFilter = function (item) {
            return acceptType(this.accept, item.type, item.name);
        };
        ngf.prototype._fileSizeFilter = function (item) {
            return !(this.maxSize && item.size > this.maxSize);
        };
        /** browsers try hard to conceal data about file drags, this tends to undo that */
        ngf.prototype.filesToWriteableObject = function (files) {
            var jsonFiles = [];
            for (var x = 0; x < files.length; ++x) {
                jsonFiles.push({
                    type: files[x].type,
                    kind: files[x]["kind"]
                });
            }
            return jsonFiles;
        };
        ngf.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], ngf.prototype, "multiple", void 0);
        __decorate([
            core.Input()
        ], ngf.prototype, "accept", void 0);
        __decorate([
            core.Input()
        ], ngf.prototype, "maxSize", void 0);
        __decorate([
            core.Input()
        ], ngf.prototype, "ngfFixOrientation", void 0);
        __decorate([
            core.Input()
        ], ngf.prototype, "fileDropDisabled", void 0);
        __decorate([
            core.Input()
        ], ngf.prototype, "selectable", void 0);
        __decorate([
            core.Output('init')
        ], ngf.prototype, "directiveInit", void 0);
        __decorate([
            core.Input()
        ], ngf.prototype, "lastInvalids", void 0);
        __decorate([
            core.Output()
        ], ngf.prototype, "lastInvalidsChange", void 0);
        __decorate([
            core.Input()
        ], ngf.prototype, "lastBaseUrl", void 0);
        __decorate([
            core.Output()
        ], ngf.prototype, "lastBaseUrlChange", void 0);
        __decorate([
            core.Input()
        ], ngf.prototype, "file", void 0);
        __decorate([
            core.Output()
        ], ngf.prototype, "fileChange", void 0);
        __decorate([
            core.Input()
        ], ngf.prototype, "files", void 0);
        __decorate([
            core.Output()
        ], ngf.prototype, "filesChange", void 0);
        __decorate([
            core.HostListener('change', ['$event'])
        ], ngf.prototype, "onChange", null);
        ngf = __decorate([
            core.Directive({
                selector: "[ngf]",
                exportAs: "ngf"
            })
        ], ngf);
        return ngf;
    }());

    var ngfSelect = /** @class */ (function (_super) {
        __extends(ngfSelect, _super);
        function ngfSelect() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.selectable = true;
            return _this;
        }
        __decorate([
            core.Input()
        ], ngfSelect.prototype, "selectable", void 0);
        ngfSelect = __decorate([
            core.Directive({
                selector: "[ngfSelect]",
                exportAs: "ngfSelect"
            })
        ], ngfSelect);
        return ngfSelect;
    }(ngf));

    var ngfDrop = /** @class */ (function (_super) {
        __extends(ngfDrop, _super);
        function ngfDrop() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.fileOver = new core.EventEmitter();
            _this.validDrag = false;
            _this.validDragChange = new core.EventEmitter();
            _this.invalidDrag = false;
            _this.invalidDragChange = new core.EventEmitter();
            _this.dragFilesChange = new core.EventEmitter();
            return _this;
        }
        ngfDrop.prototype.onDrop = function (event) {
            if (this.fileDropDisabled) {
                this.stopEvent(event);
                return;
            }
            this.closeDrags();
            var files = this.eventToFiles(event);
            if (!files.length)
                return;
            this.stopEvent(event);
            this.handleFiles(files);
        };
        ngfDrop.prototype.handleFiles = function (files) {
            this.fileOver.emit(false); //turn-off dragover
            _super.prototype.handleFiles.call(this, files);
        };
        ngfDrop.prototype.onDragOver = function (event) {
            if (this.fileDropDisabled) {
                this.stopEvent(event);
                return;
            }
            var transfer = this.eventToTransfer(event);
            var files = this.eventToFiles(event);
            var jsonFiles = this.filesToWriteableObject(files);
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
        };
        ngfDrop.prototype.closeDrags = function () {
            delete this.validDrag;
            this.validDragChange.emit(this.validDrag);
            this.invalidDrag = false;
            this.invalidDragChange.emit(this.invalidDrag);
            delete this.dragFiles;
            this.dragFilesChange.emit(this.dragFiles);
        };
        ngfDrop.prototype.onDragLeave = function (event) {
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
        };
        __decorate([
            core.Output()
        ], ngfDrop.prototype, "fileOver", void 0);
        __decorate([
            core.Input()
        ], ngfDrop.prototype, "validDrag", void 0);
        __decorate([
            core.Output()
        ], ngfDrop.prototype, "validDragChange", void 0);
        __decorate([
            core.Input()
        ], ngfDrop.prototype, "invalidDrag", void 0);
        __decorate([
            core.Output()
        ], ngfDrop.prototype, "invalidDragChange", void 0);
        __decorate([
            core.Input()
        ], ngfDrop.prototype, "dragFiles", void 0);
        __decorate([
            core.Output()
        ], ngfDrop.prototype, "dragFilesChange", void 0);
        __decorate([
            core.HostListener('drop', ['$event'])
        ], ngfDrop.prototype, "onDrop", null);
        __decorate([
            core.HostListener('dragover', ['$event'])
        ], ngfDrop.prototype, "onDragOver", null);
        __decorate([
            core.HostListener('dragleave', ['$event'])
        ], ngfDrop.prototype, "onDragLeave", null);
        ngfDrop = __decorate([
            core.Directive({
                selector: "[ngfDrop]",
                exportAs: "ngfDrop"
            })
        ], ngfDrop);
        return ngfDrop;
    }(ngf));

    var ngfBackground = /** @class */ (function () {
        function ngfBackground(ElementRef) {
            this.ElementRef = ElementRef;
        }
        ngfBackground.prototype.ngOnChanges = function (_changes) {
            var _this = this;
            dataUrl(this.file)
                .then(function (src) {
                var urlString = 'url(\'' + (src || '') + '\')';
                _this.ElementRef.nativeElement.style.backgroundImage = urlString;
            });
        };
        ngfBackground.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input('ngfBackground')
        ], ngfBackground.prototype, "file", void 0);
        ngfBackground = __decorate([
            core.Directive({ selector: '[ngfBackground]' })
        ], ngfBackground);
        return ngfBackground;
    }());

    var ngfUploadStatus = /** @class */ (function () {
        function ngfUploadStatus() {
            this.percent = 0;
            this.percentChange = new core.EventEmitter();
        }
        ngfUploadStatus.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (changes.httpEvent && changes.httpEvent.currentValue) {
                var event_1 = changes.httpEvent.currentValue;
                if (event_1.loaded && event_1.total) {
                    setTimeout(function () {
                        _this.percent = Math.round(100 * event_1.loaded / event_1.total);
                        _this.percentChange.emit(_this.percent);
                    }, 0);
                }
            }
        };
        __decorate([
            core.Input()
        ], ngfUploadStatus.prototype, "percent", void 0);
        __decorate([
            core.Output()
        ], ngfUploadStatus.prototype, "percentChange", void 0);
        __decorate([
            core.Input()
        ], ngfUploadStatus.prototype, "httpEvent", void 0);
        ngfUploadStatus = __decorate([
            core.Directive({ selector: 'ngfUploadStatus' })
        ], ngfUploadStatus);
        return ngfUploadStatus;
    }());

    var ngfFormData = /** @class */ (function () {
        function ngfFormData(IterableDiffers) {
            this.postName = "file";
            this.FormData = new FormData();
            this.FormDataChange = new core.EventEmitter();
            this.differ = IterableDiffers.find([]).create();
        }
        ngfFormData.prototype.ngDoCheck = function () {
            var _this = this;
            var changes = this.differ.diff(this.files);
            if (changes) {
                setTimeout(function () { return _this.buildFormData(); }, 0);
            }
        };
        ngfFormData.prototype.buildFormData = function () {
            var _this = this;
            var isArray = typeof (this.files) === 'object' && this.files.constructor === Array;
            if (isArray) {
                this.FormData = new FormData();
                var files = this.files || [];
                files.forEach(function (file) {
                    return _this.FormData.append(_this.postName, file, _this.fileName || file.name);
                });
                this.FormDataChange.emit(this.FormData);
            }
            else {
                delete this.FormData;
            }
        };
        ngfFormData.ctorParameters = function () { return [
            { type: core.IterableDiffers }
        ]; };
        __decorate([
            core.Input()
        ], ngfFormData.prototype, "files", void 0);
        __decorate([
            core.Input()
        ], ngfFormData.prototype, "postName", void 0);
        __decorate([
            core.Input()
        ], ngfFormData.prototype, "fileName", void 0);
        __decorate([
            core.Input()
        ], ngfFormData.prototype, "FormData", void 0);
        __decorate([
            core.Output()
        ], ngfFormData.prototype, "FormDataChange", void 0);
        ngfFormData = __decorate([
            core.Directive({ selector: 'ngfFormData' })
        ], ngfFormData);
        return ngfFormData;
    }());

    var ngfSrc = /** @class */ (function () {
        function ngfSrc(ElementRef) {
            this.ElementRef = ElementRef;
        }
        ngfSrc.prototype.ngOnChanges = function (_changes) {
            var _this = this;
            dataUrl(this.file)
                .then(function (src) {
                return _this.ElementRef.nativeElement.src = src;
            });
        };
        ngfSrc.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input('ngfSrc')
        ], ngfSrc.prototype, "file", void 0);
        ngfSrc = __decorate([
            core.Directive({ selector: '[ngfSrc]' })
        ], ngfSrc);
        return ngfSrc;
    }());

    //import{ HttpModule } from '@angular/http';
    var declarations = [
        ngfDrop,
        ngfSelect,
        ngfBackground,
        ngfSrc,
        ngfUploadStatus,
        ngfFormData,
        ngf
    ];
    var ngfModule = /** @class */ (function () {
        function ngfModule() {
        }
        ngfModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule
                    //,HttpModule
                ],
                declarations: declarations,
                exports: declarations //[HttpModule, ...declarations]
            })
        ], ngfModule);
        return ngfModule;
    }());

    exports.ngf = ngf;
    exports.ngfBackground = ngfBackground;
    exports.ngfDrop = ngfDrop;
    exports.ngfFormData = ngfFormData;
    exports.ngfModule = ngfModule;
    exports.ngfSelect = ngfSelect;
    exports.ngfSrc = ngfSrc;
    exports.ngfUploadStatus = ngfUploadStatus;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-file.umd.js.map
