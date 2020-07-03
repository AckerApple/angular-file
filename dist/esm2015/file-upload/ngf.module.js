import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ngfBackground } from './ngfBackground.directive';
import { ngfDrop } from './ngfDrop.directive';
import { ngf } from './ngf.directive';
import { ngfSelect } from './ngfSelect.directive';
import { ngfUploadStatus } from './ngfUploadStatus.directive';
import { ngfFormData } from './ngfFormData.directive';
import { ngfSrc } from './ngfSrc.directive';
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
export class ngfModule {
}
ngfModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                    //,HttpModule
                ],
                declarations: declarations,
                exports: declarations //[HttpModule, ...declarations]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZmlsZS9zcmMvZmlsZS11cGxvYWQvbmdmLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsNENBQTRDO0FBRTVDLE1BQU0sWUFBWSxHQUFHO0lBQ25CLE9BQU87SUFDUCxTQUFTO0lBQ1QsYUFBYTtJQUNiLE1BQU07SUFDTixlQUFlO0lBQ2YsV0FBVztJQUNYLEdBQUc7Q0FDSixDQUFBO0FBU0UsTUFBTSxPQUFPLFNBQVM7OztZQVB4QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osYUFBYTtpQkFDZDtnQkFDRCxZQUFZLEVBQUUsWUFBWTtnQkFDMUIsT0FBTyxFQUFFLFlBQVksQ0FBQSwrQkFBK0I7YUFDckQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgbmdmQmFja2dyb3VuZCB9IGZyb20gJy4vbmdmQmFja2dyb3VuZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBuZ2ZEcm9wIH0gZnJvbSAnLi9uZ2ZEcm9wLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IG5nZiB9IGZyb20gJy4vbmdmLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IG5nZlNlbGVjdCB9IGZyb20gJy4vbmdmU2VsZWN0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IG5nZlVwbG9hZFN0YXR1cyB9IGZyb20gJy4vbmdmVXBsb2FkU3RhdHVzLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IG5nZkZvcm1EYXRhIH0gZnJvbSAnLi9uZ2ZGb3JtRGF0YS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBuZ2ZTcmMgfSBmcm9tICcuL25nZlNyYy5kaXJlY3RpdmUnO1xyXG4vL2ltcG9ydHsgSHR0cE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5cclxuY29uc3QgZGVjbGFyYXRpb25zID0gW1xyXG4gIG5nZkRyb3AsXHJcbiAgbmdmU2VsZWN0LFxyXG4gIG5nZkJhY2tncm91bmQsXHJcbiAgbmdmU3JjLFxyXG4gIG5nZlVwbG9hZFN0YXR1cyxcclxuICBuZ2ZGb3JtRGF0YSxcclxuICBuZ2ZcclxuXVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICAgIC8vLEh0dHBNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogZGVjbGFyYXRpb25zLFxyXG4gIGV4cG9ydHM6IGRlY2xhcmF0aW9ucy8vW0h0dHBNb2R1bGUsIC4uLmRlY2xhcmF0aW9uc11cclxufSkgZXhwb3J0IGNsYXNzIG5nZk1vZHVsZSB7fSJdfQ==