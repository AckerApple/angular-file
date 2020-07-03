import { IterableDiffer, IterableDiffers, EventEmitter } from '@angular/core';
export declare class ngfFormData {
    files: File[];
    postName: string;
    fileName: string;
    FormData: FormData;
    FormDataChange: EventEmitter<FormData>;
    differ: IterableDiffer<{}>;
    constructor(IterableDiffers: IterableDiffers);
    ngDoCheck(): void;
    buildFormData(): void;
}
