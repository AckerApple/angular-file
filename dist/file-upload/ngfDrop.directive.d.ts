import { EventEmitter } from '@angular/core';
import { ngf, dragMeta } from "./ngf.directive";
export declare class ngfDrop extends ngf {
    fileOver: EventEmitter<any>;
    validDrag: boolean;
    validDragChange: EventEmitter<boolean>;
    invalidDrag: boolean;
    invalidDragChange: EventEmitter<boolean>;
    dragFiles: dragMeta[];
    dragFilesChange: EventEmitter<dragMeta[]>;
    onDrop(event: Event): void;
    handleFiles(files: File[]): void;
    onDragOver(event: Event): void;
    closeDrags(): void;
    onDragLeave(event: Event): any;
}
