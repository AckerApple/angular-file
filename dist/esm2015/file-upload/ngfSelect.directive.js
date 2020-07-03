import { Directive, Input } from "@angular/core";
import { ngf } from "./ngf.directive";
export class ngfSelect extends ngf {
    constructor() {
        super(...arguments);
        this.selectable = true;
    }
}
ngfSelect.decorators = [
    { type: Directive, args: [{
                selector: "[ngfSelect]",
                exportAs: "ngfSelect"
            },] }
];
ngfSelect.propDecorators = {
    selectable: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdmU2VsZWN0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZmlsZS9zcmMvZmlsZS11cGxvYWQvbmdmU2VsZWN0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0saUJBQWlCLENBQUE7QUFNckMsTUFBTSxPQUFPLFNBQVUsU0FBUSxHQUFHO0lBSmxDOztRQUtXLGVBQVUsR0FBTyxJQUFJLENBQUE7SUFDaEMsQ0FBQzs7O1lBTkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUUsV0FBVzthQUN0Qjs7O3lCQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIlxyXG5pbXBvcnQgeyBuZ2YgfSBmcm9tIFwiLi9uZ2YuZGlyZWN0aXZlXCJcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiBcIltuZ2ZTZWxlY3RdXCIsXHJcbiAgZXhwb3J0QXM6IFwibmdmU2VsZWN0XCJcclxufSlcclxuZXhwb3J0IGNsYXNzIG5nZlNlbGVjdCBleHRlbmRzIG5nZiB7XHJcbiAgQElucHV0KCkgc2VsZWN0YWJsZTphbnkgPSB0cnVlXHJcbn0iXX0=