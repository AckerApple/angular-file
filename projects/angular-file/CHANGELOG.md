# angular-file - Change Log
All notable changes to this project will be documented here.

## 3.2.0 - (2020-06-25)
- Build against angular@10.0.0

## 3.1.0 - (2020-06-10)
- Build using @angular/cli library

## 3.0.1 - (2019-03-17)
- fix typo

## 3.0.0 - (2019-02-01)
- Built on Angular 9

## 2.0.0 - (2019-11-04)
- built for dist better
- built for ivy

## 1.3.1 - (2019-06-27)
- Built on ng8
  - NOTE: A report from another package on ng8 claims may not be compatible with ng7
- Built with strict mode
- Fixed demo upload url
- Fixed testing enviroment
- Docs have bundle sizes

## 1.2.4 - (2019-06-26)
- updated docs
- removed peer dependencies
- moved some dependencies into devDependencies

## 1.2.3 - (2019-05-22)
- kb to byte on demo page
  - https://github.com/AckerApple/angular-file/issues/55

## 1.2.1 - (2019-05-20)
- Adjust processing events into files

## 1.2.0 - (2019-05-16)
- Updated to latest Angular
- Demo has bundle stats
- Removed legacy build techniques
- Updated from angular-cli.json to angular.json

## 1.1.1 - (2019-04-04)
- Added ngfSrc

## 1.1.0 - (2019-02-13)
- Fixed fileDropDisabled binding
- Docs to clarify ngf versus ngfDrop versus ngfSelect

## 1.0.2 - (2019-02-13)
- Fix click action as swipe check
  - [github issue](https://github.com/AckerApple/angular-file/issues/44)

## 1.0.0 - (2019-02-11)
- strict mode on
- check file type before file size
- [(ref)] bindings have been removed from all components/directives
  - no more [(ngf)]
  - no more [(ngfSelect))]
  - use template references if needed: `<input #ngfSelect="ngfSelect" ngSelect />`

## 0.5.9 - (2018-12-04)
- documentation

## 0.5.4 - (2018-04-21)
- Fix file check when no files defined

## 0.5.2 - (2018-04-21)
- Fix single file reselect after item removed from files

## 0.5.0 - (2018-02-07)
- Removed much unused code from original package that this is a fork from
- Fixed and ensured accept attribute working correctly
- Improved demo page in terms of the accept attribute and file drag metadata
- BREAKING CHANGES
  - Removed directive ngfUploader
  - ngfUploader.directive.ts has been removed from this package
  - FileUploader.class.ts has been removed from this package
  - FileUploader.class has been removed from this package
  - FileItem.class has been removed from this package
  - FileLikeObject.class has been removed from this package
  - Files are always considered valid when dragged inside browsers that dont allow ANY drag file metadata
  - Input forceFilename has been removed from all ngf directives
  - Input forcePostname has been removed from all ngf directives

## [0.4.0] - (2017-12-05)
- BREAKING CHANGES
  - Angular 4 updated to 5.0.5
    - Expected this package will require Angular5+
  - Updated every dependency

## [0.3.8] - 2017-11-27
- made accept and maxSize update on change

## [0.3.7] - 2017-11-03
- added ngfFormData directive

## [0.3.6] - 2017-10-26
- case-insensative accept filtering

## [0.3.5] - 2017-10-25
- Ensured accept filters transmit file names when possible for better mime type checking

## [0.3.4] - 2017-10-24
- enhanced acceptFilter filter checking

## [0.3.3] - 2017-10-02
- fixed IE11 dragdrop issue

## [0.3.0] - 2017-10-02
### Breaking Changes
- [(files)] is now a default blank array . May cause issues if you have *ngIf="files" instead of *ngIf="files.length"
- removed useNgHttp from ngfUploader and no longer depend on angular/http
- ngf, ngfSelect, and ngfDrop no longer reset the [(files)]. They always append new files
### Added
- ngfUploadStatus

## [0.2.0] - 2017-10-02
### Breaking Changes
- FileUploader isHtml5Mode has been removed
### Added
- ngfUploader

## [0.1.0] - 2017-08-31
### Breaking Changes
- fileUrl is now lastBaseUrl

## [0.0.0] - 2017-08-31
### Overhauled by Acker
- Taken from an outdated barely usable package to an up-to-date slimmed down easier to develop version
## Added
- uploader.getFormData()

