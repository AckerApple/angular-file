import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ngf } from "./ngf.directive";
export class ngfDrop extends ngf {
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
}
ngfDrop.decorators = [
    { type: Directive, args: [{
                selector: "[ngfDrop]",
                exportAs: "ngfDrop"
            },] }
];
ngfDrop.propDecorators = {
    fileOver: [{ type: Output }],
    validDrag: [{ type: Input }],
    validDragChange: [{ type: Output }],
    invalidDrag: [{ type: Input }],
    invalidDragChange: [{ type: Output }],
    dragFiles: [{ type: Input }],
    dragFilesChange: [{ type: Output }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }],
    onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRHJvcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZpbGUvc3JjL2ZpbGUtdXBsb2FkL25nZkRyb3AuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsWUFBWSxFQUN2QixZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFDNUIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEdBQUcsRUFBWSxNQUFNLGlCQUFpQixDQUFBO0FBTS9DLE1BQU0sT0FBTyxPQUFRLFNBQVEsR0FBRztJQUpoQzs7UUFLWSxhQUFRLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsY0FBUyxHQUFXLEtBQUssQ0FBQTtRQUN4QixvQkFBZSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRTNELGdCQUFXLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLHNCQUFpQixHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFBO1FBRzVELG9CQUFlLEdBQTRCLElBQUksWUFBWSxFQUFFLENBQUE7SUFpRnpFLENBQUM7SUE5RUMsTUFBTSxDQUFDLEtBQVc7UUFDaEIsSUFBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixPQUFNO1NBQ1A7UUFFRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUVwQyxJQUFHLENBQUMsS0FBSyxDQUFDLE1BQU07WUFBQyxPQUFNO1FBRXZCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN6QixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQVk7UUFDdEIs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WUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQzswQkF3Q25DLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBuZ2YsIGRyYWdNZXRhIH0gZnJvbSBcIi4vbmdmLmRpcmVjdGl2ZVwiXHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogXCJbbmdmRHJvcF1cIixcclxuICBleHBvcnRBczogXCJuZ2ZEcm9wXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIG5nZkRyb3AgZXh0ZW5kcyBuZ2Yge1xyXG4gIEBPdXRwdXQoKSBmaWxlT3ZlcjpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQElucHV0KCkgdmFsaWREcmFnOmJvb2xlYW4gPSBmYWxzZVxyXG4gIEBPdXRwdXQoKSB2YWxpZERyYWdDaGFuZ2U6RXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcblxyXG4gIEBJbnB1dCgpIGludmFsaWREcmFnID0gZmFsc2VcclxuICBAT3V0cHV0KCkgaW52YWxpZERyYWdDaGFuZ2U6RXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpXHJcblxyXG4gIEBJbnB1dCgpIGRyYWdGaWxlcyAhOiBkcmFnTWV0YVtdXHJcbiAgQE91dHB1dCgpIGRyYWdGaWxlc0NoYW5nZTpFdmVudEVtaXR0ZXI8ZHJhZ01ldGFbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXHJcbiAgb25Ecm9wKGV2ZW50OkV2ZW50KTp2b2lkIHtcclxuICAgIGlmKHRoaXMuZmlsZURyb3BEaXNhYmxlZCl7XHJcbiAgICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jbG9zZURyYWdzKClcclxuICAgIGxldCBmaWxlcyA9IHRoaXMuZXZlbnRUb0ZpbGVzKGV2ZW50KVxyXG5cclxuICAgIGlmKCFmaWxlcy5sZW5ndGgpcmV0dXJuXHJcblxyXG4gICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpO1xyXG4gICAgdGhpcy5oYW5kbGVGaWxlcyhmaWxlcylcclxuICB9XHJcblxyXG4gIGhhbmRsZUZpbGVzKGZpbGVzOkZpbGVbXSl7XHJcbiAgICB0aGlzLmZpbGVPdmVyLmVtaXQoZmFsc2UpLy90dXJuLW9mZiBkcmFnb3ZlclxyXG4gICAgc3VwZXIuaGFuZGxlRmlsZXMoZmlsZXMpXHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXHJcbiAgb25EcmFnT3ZlcihldmVudDpFdmVudCk6dm9pZCB7XHJcbiAgICBpZih0aGlzLmZpbGVEcm9wRGlzYWJsZWQpe1xyXG4gICAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRyYW5zZmVyID0gdGhpcy5ldmVudFRvVHJhbnNmZXIoZXZlbnQpXHJcblxyXG4gICAgbGV0IGZpbGVzID0gdGhpcy5ldmVudFRvRmlsZXMoZXZlbnQpXHJcblxyXG4gICAgbGV0IGpzb25GaWxlcyA9IHRoaXMuZmlsZXNUb1dyaXRlYWJsZU9iamVjdChmaWxlcylcclxuICAgIHRoaXMuZHJhZ0ZpbGVzQ2hhbmdlLmVtaXQoIHRoaXMuZHJhZ0ZpbGVzPWpzb25GaWxlcyApXHJcblxyXG4gICAgaWYoIGZpbGVzLmxlbmd0aCApe1xyXG4gICAgICB0aGlzLnZhbGlkRHJhZyA9IHRoaXMuaXNGaWxlc1ZhbGlkKGZpbGVzKVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIC8vU2FmYXJpLCBJRTExICYgc29tZSBicm93c2VycyBkbyBOT1QgdGVsbCB5b3UgYWJvdXQgZHJhZ2dlZCBmaWxlcyB1bnRpbCBkcm9wcGVkLiBBbHdheXMgY29uc2lkZXIgYSB2YWxpZCBkcmFnXHJcbiAgICAgIHRoaXMudmFsaWREcmFnID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmFsaWREcmFnQ2hhbmdlLmVtaXQodGhpcy52YWxpZERyYWcpXHJcblxyXG4gICAgdGhpcy5pbnZhbGlkRHJhZyA9ICF0aGlzLnZhbGlkRHJhZ1xyXG4gICAgdGhpcy5pbnZhbGlkRHJhZ0NoYW5nZS5lbWl0KHRoaXMuaW52YWxpZERyYWcpXHJcblxyXG4gICAgdHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5Jy8vY2hhbmdlIGN1cnNvciBhbmQgc3VjaFxyXG4gICAgdGhpcy5zdG9wRXZlbnQoZXZlbnQpXHJcbiAgICB0aGlzLmZpbGVPdmVyLmVtaXQodHJ1ZSlcclxuICB9XHJcblxyXG4gIGNsb3NlRHJhZ3MoKXtcclxuICAgIGRlbGV0ZSB0aGlzLnZhbGlkRHJhZ1xyXG4gICAgdGhpcy52YWxpZERyYWdDaGFuZ2UuZW1pdCh0aGlzLnZhbGlkRHJhZylcclxuICAgIHRoaXMuaW52YWxpZERyYWcgPSBmYWxzZVxyXG4gICAgdGhpcy5pbnZhbGlkRHJhZ0NoYW5nZS5lbWl0KHRoaXMuaW52YWxpZERyYWcpXHJcbiAgICBkZWxldGUgdGhpcy5kcmFnRmlsZXNcclxuICAgIHRoaXMuZHJhZ0ZpbGVzQ2hhbmdlLmVtaXQoIHRoaXMuZHJhZ0ZpbGVzIClcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXHJcbiAgb25EcmFnTGVhdmUoZXZlbnQ6RXZlbnQpOmFueSB7XHJcbiAgICBpZih0aGlzLmZpbGVEcm9wRGlzYWJsZWQpe1xyXG4gICAgICB0aGlzLnN0b3BFdmVudChldmVudCk7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLmNsb3NlRHJhZ3MoKVxyXG5cclxuICAgIGlmICgodGhpcyBhcyBhbnkpLmVsZW1lbnQpIHtcclxuICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQgPT09ICh0aGlzIGFzIGFueSkuZWxlbWVudFswXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RvcEV2ZW50KGV2ZW50KTtcclxuICAgIHRoaXMuZmlsZU92ZXIuZW1pdChmYWxzZSk7XHJcbiAgfVxyXG59Il19