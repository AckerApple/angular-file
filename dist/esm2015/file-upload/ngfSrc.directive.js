import { Directive, ElementRef, Input } from '@angular/core';
import { dataUrl } from './fileTools';
export class ngfSrc {
    constructor(ElementRef) {
        this.ElementRef = ElementRef;
    }
    ngOnChanges(_changes) {
        dataUrl(this.file)
            .then(src => this.ElementRef.nativeElement.src = src);
    }
}
ngfSrc.decorators = [
    { type: Directive, args: [{ selector: '[ngfSrc]' },] }
];
ngfSrc.ctorParameters = () => [
    { type: ElementRef }
];
ngfSrc.propDecorators = {
    file: [{ type: Input, args: ['ngfSrc',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmU3JjLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZmlsZS9zcmMvZmlsZS11cGxvYWQvbmdmU3JjLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUd0QyxNQUFNLE9BQU8sTUFBTTtJQUdqQixZQUFtQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUksQ0FBQztJQUU5QyxXQUFXLENBQUMsUUFBYTtRQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNqQixJQUFJLENBQUMsR0FBRyxDQUFBLEVBQUUsQ0FDVCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUN4QyxDQUFBO0lBQ0gsQ0FBQzs7O1lBWEYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRTs7O1lBSGYsVUFBVTs7O21CQUszQixLQUFLLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZGF0YVVybCB9IGZyb20gJy4vZmlsZVRvb2xzJztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ2ZTcmNdJyB9KVxyXG5leHBvcnQgY2xhc3MgbmdmU3JjIHtcclxuICBASW5wdXQoJ25nZlNyYycpIGZpbGU6IGFueVxyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgRWxlbWVudFJlZjogRWxlbWVudFJlZikgeyB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKF9jaGFuZ2VzOiBhbnkpIHtcclxuICAgIGRhdGFVcmwodGhpcy5maWxlKVxyXG4gICAgLnRoZW4oc3JjPT5cclxuICAgICAgdGhpcy5FbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3JjID0gc3JjXHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiJdfQ==