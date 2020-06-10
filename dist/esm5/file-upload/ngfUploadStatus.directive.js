import { __decorate, __metadata } from "tslib";
import { Directive, EventEmitter, Output, Input } from '@angular/core';
var ngfUploadStatus = /** @class */ (function () {
    function ngfUploadStatus() {
        this.percent = 0;
        this.percentChange = new EventEmitter();
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
        Input(),
        __metadata("design:type", Number)
    ], ngfUploadStatus.prototype, "percent", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ngfUploadStatus.prototype, "percentChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Event)
    ], ngfUploadStatus.prototype, "httpEvent", void 0);
    ngfUploadStatus = __decorate([
        Directive({ selector: 'ngfUploadStatus' })
    ], ngfUploadStatus);
    return ngfUploadStatus;
}());
export { ngfUploadStatus };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmVXBsb2FkU3RhdHVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS8iLCJzb3VyY2VzIjpbImZpbGUtdXBsb2FkL25nZlVwbG9hZFN0YXR1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkU7SUFBQTtRQUNXLFlBQU8sR0FBVSxDQUFDLENBQUE7UUFDakIsa0JBQWEsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQTtJQWNuRSxDQUFDO0lBWEMscUNBQVcsR0FBWCxVQUFhLE9BQU87UUFBcEIsaUJBVUM7UUFUQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUU7WUFDdkQsSUFBTSxPQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUE7WUFDNUMsSUFBSSxPQUFLLENBQUMsTUFBTSxJQUFJLE9BQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQy9CLFVBQVUsQ0FBQztvQkFDVCxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQUssQ0FBQyxNQUFNLEdBQUcsT0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1RCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBRSxLQUFJLENBQUMsT0FBTyxDQUFFLENBQUE7Z0JBQ3pDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTthQUNOO1NBQ0Y7SUFDSCxDQUFDO0lBZFE7UUFBUixLQUFLLEVBQUU7O29EQUFtQjtJQUNqQjtRQUFULE1BQU0sRUFBRTtrQ0FBZSxZQUFZOzBEQUE2QjtJQUN4RDtRQUFSLEtBQUssRUFBRTtrQ0FBYyxLQUFLO3NEQUFBO0lBSGhCLGVBQWU7UUFEM0IsU0FBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFDLENBQUM7T0FDNUIsZUFBZSxDQWdCM0I7SUFBRCxzQkFBQztDQUFBLEFBaEJELElBZ0JDO1NBaEJZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZ2ZVcGxvYWRTdGF0dXMnfSlcclxuZXhwb3J0IGNsYXNzIG5nZlVwbG9hZFN0YXR1cyB7XHJcbiAgQElucHV0KCkgcGVyY2VudDpudW1iZXIgPSAwXHJcbiAgQE91dHB1dCgpIHBlcmNlbnRDaGFuZ2U6RXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuICBASW5wdXQoKSBodHRwRXZlbnQgITogRXZlbnRcclxuXHJcbiAgbmdPbkNoYW5nZXMoIGNoYW5nZXMgKXtcclxuICAgIGlmKCBjaGFuZ2VzLmh0dHBFdmVudCAmJiBjaGFuZ2VzLmh0dHBFdmVudC5jdXJyZW50VmFsdWUgKXtcclxuICAgICAgY29uc3QgZXZlbnQgPSBjaGFuZ2VzLmh0dHBFdmVudC5jdXJyZW50VmFsdWVcclxuICAgICAgaWYgKGV2ZW50LmxvYWRlZCAmJiBldmVudC50b3RhbCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgIHRoaXMucGVyY2VudCA9IE1hdGgucm91bmQoMTAwICogZXZlbnQubG9hZGVkIC8gZXZlbnQudG90YWwpO1xyXG4gICAgICAgICAgdGhpcy5wZXJjZW50Q2hhbmdlLmVtaXQoIHRoaXMucGVyY2VudCApXHJcbiAgICAgICAgfSwgMClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSJdfQ==