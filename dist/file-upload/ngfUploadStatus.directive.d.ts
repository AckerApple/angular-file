import { EventEmitter } from '@angular/core';
export declare class ngfUploadStatus {
    percent: number;
    percentChange: EventEmitter<number>;
    httpEvent: Event;
    ngOnChanges(changes: any): void;
}
