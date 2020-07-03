export declare function getWindow(): any;
export declare function acceptType(accept: string, type: string, name?: string): boolean;
export interface InvalidFileItem {
    file: File;
    type: string;
}
export declare function arrayBufferToBase64(buffer: any): string;
export declare function dataUrltoBlob(dataurl: string, name: string, origSize?: any): Blob;
export interface orientationMeta {
    orientation: number;
    fixedArrayBuffer?: any[];
}
export declare function applyTransform(ctx: CanvasRenderingContext2D, orientation: number, width: number, height: number): void;
export declare function fixFileOrientationByMeta(file: File, result: orientationMeta): Promise<File>;
export declare function applyExifRotation(file: File): Promise<File>;
export declare function readOrientation(file: File): Promise<orientationMeta>;
/** converts file-input file into base64 dataUri */
export declare function dataUrl(file: any, disallowObjectUrl?: any): Promise<string>;
export declare function restoreExif(orig: any, resized: any): any;
