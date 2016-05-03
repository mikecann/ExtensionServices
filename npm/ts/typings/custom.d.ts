declare module "lzjs"
{
     export function compress(data: any): any;
     export function decompress(data: any): any;
     export function compressToBase64(data: any): string;
     export function decompressFromBase64(data: string): any;
}