import { Directive, ElementRef, Input } from '@angular/core';
import { dataUrl } from './fileTools';
export class ngfBackground {
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
}
ngfBackground.decorators = [
    { type: Directive, args: [{ selector: '[ngfBackground]' },] }
];
ngfBackground.ctorParameters = () => [
    { type: ElementRef }
];
ngfBackground.propDecorators = {
    file: [{ type: Input, args: ['ngfBackground',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmQmFja2dyb3VuZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZpbGUvc3JjL2ZpbGUtdXBsb2FkL25nZkJhY2tncm91bmQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3RDLE1BQU0sT0FBTyxhQUFhO0lBR3hCLFlBQW1CLFVBQXFCO1FBQXJCLGVBQVUsR0FBVixVQUFVLENBQVc7SUFBRSxDQUFDO0lBRTNDLFdBQVcsQ0FBRSxRQUFZO1FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUEsRUFBRTtZQUNULE1BQU0sU0FBUyxHQUFHLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUE7WUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUE7UUFDakUsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDOzs7WUFaRixTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUM7OztZQUhwQixVQUFVOzs7bUJBSzNCLEtBQUssU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBkYXRhVXJsIH0gZnJvbSAnLi9maWxlVG9vbHMnO1xyXG5cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdmQmFja2dyb3VuZF0nfSlcclxuZXhwb3J0IGNsYXNzIG5nZkJhY2tncm91bmQge1xyXG4gIEBJbnB1dCgnbmdmQmFja2dyb3VuZCcpIGZpbGU6YW55XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBFbGVtZW50UmVmOkVsZW1lbnRSZWYpe31cclxuXHJcbiAgbmdPbkNoYW5nZXMoIF9jaGFuZ2VzOmFueSApe1xyXG4gICAgZGF0YVVybCh0aGlzLmZpbGUpXHJcbiAgICAudGhlbihzcmM9PntcclxuICAgICAgY29uc3QgdXJsU3RyaW5nID0gJ3VybChcXCcnICsgKHNyYyB8fCAnJykgKyAnXFwnKSdcclxuICAgICAgdGhpcy5FbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gdXJsU3RyaW5nXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=