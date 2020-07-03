import { IterableDiffers, Directive, EventEmitter, Output, Input } from '@angular/core';
export class ngfFormData {
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
}
ngfFormData.decorators = [
    { type: Directive, args: [{ selector: 'ngfFormData' },] }
];
ngfFormData.ctorParameters = () => [
    { type: IterableDiffers }
];
ngfFormData.propDecorators = {
    files: [{ type: Input }],
    postName: [{ type: Input }],
    fileName: [{ type: Input }],
    FormData: [{ type: Input }],
    FormDataChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmRm9ybURhdGEuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1maWxlL3NyYy9maWxlLXVwbG9hZC9uZ2ZGb3JtRGF0YS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLGVBQWUsRUFDZixTQUFTLEVBQUUsWUFBWSxFQUN2QixNQUFNLEVBQUUsS0FBSyxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE1BQU0sT0FBTyxXQUFXO0lBVXRCLFlBQVksZUFBZ0M7UUFSbkMsYUFBUSxHQUFVLE1BQU0sQ0FBQTtRQUd4QixhQUFRLEdBQVksSUFBSSxRQUFRLEVBQUUsQ0FBQTtRQUNqQyxtQkFBYyxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFBO1FBS2xFLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNqRCxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQztRQUU3QyxJQUFJLE9BQU8sRUFBRTtZQUNYLFVBQVUsQ0FBQyxHQUFFLEVBQUUsQ0FBQSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDeEM7SUFDSCxDQUFDO0lBRUQsYUFBYTtRQUNYLE1BQU0sT0FBTyxHQUFHLE9BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUcsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxLQUFHLEtBQUssQ0FBQTtRQUUvRSxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQTtZQUM5QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQTtZQUM5QixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQSxFQUFFLENBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNwRSxDQUFBO1lBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFBO1NBQzFDO2FBQUk7WUFDSCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7U0FDckI7SUFDSCxDQUFDOzs7WUFwQ0YsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGFBQWEsRUFBQzs7O1lBTGxDLGVBQWU7OztvQkFPZCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFFTCxLQUFLOzZCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEl0ZXJhYmxlRGlmZmVyLFxyXG4gIEl0ZXJhYmxlRGlmZmVycyxcclxuICBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlcixcclxuICBPdXRwdXQsIElucHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ25nZkZvcm1EYXRhJ30pXHJcbmV4cG9ydCBjbGFzcyBuZ2ZGb3JtRGF0YSB7XHJcbiAgQElucHV0KCkgZmlsZXMgITogRmlsZVtdXHJcbiAgQElucHV0KCkgcG9zdE5hbWU6c3RyaW5nID0gXCJmaWxlXCJcclxuICBASW5wdXQoKSBmaWxlTmFtZSAhOiBzdHJpbmcvL2ZvcmNlIGZpbGUgbmFtZVxyXG5cclxuICBASW5wdXQoKSBGb3JtRGF0YTpGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXHJcbiAgQE91dHB1dCgpIEZvcm1EYXRhQ2hhbmdlOkV2ZW50RW1pdHRlcjxGb3JtRGF0YT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuXHJcbiAgZGlmZmVyOkl0ZXJhYmxlRGlmZmVyPHt9PlxyXG5cclxuICBjb25zdHJ1Y3RvcihJdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyl7XHJcbiAgICB0aGlzLmRpZmZlciA9IEl0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKVxyXG4gIH1cclxuXHJcbiAgbmdEb0NoZWNrKCl7XHJcbiAgICB2YXIgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYoIHRoaXMuZmlsZXMgKTtcclxuXHJcbiAgICBpZiAoY2hhbmdlcykge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpPT50aGlzLmJ1aWxkRm9ybURhdGEoKSwgMClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJ1aWxkRm9ybURhdGEoKXtcclxuICAgIGNvbnN0IGlzQXJyYXkgPSB0eXBlb2YodGhpcy5maWxlcyk9PT0nb2JqZWN0JyAmJiB0aGlzLmZpbGVzLmNvbnN0cnVjdG9yPT09QXJyYXlcclxuXHJcbiAgICBpZiggaXNBcnJheSApe1xyXG4gICAgICB0aGlzLkZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcclxuICAgICAgY29uc3QgZmlsZXMgPSB0aGlzLmZpbGVzIHx8IFtdXHJcbiAgICAgIGZpbGVzLmZvckVhY2goZmlsZT0+XHJcbiAgICAgICAgdGhpcy5Gb3JtRGF0YS5hcHBlbmQodGhpcy5wb3N0TmFtZSwgZmlsZSwgdGhpcy5maWxlTmFtZXx8ZmlsZS5uYW1lKVxyXG4gICAgICApXHJcbiAgICAgIHRoaXMuRm9ybURhdGFDaGFuZ2UuZW1pdCggdGhpcy5Gb3JtRGF0YSApXHJcbiAgICB9ZWxzZXtcclxuICAgICAgZGVsZXRlIHRoaXMuRm9ybURhdGFcclxuICAgIH1cclxuICB9XHJcbn0iXX0=