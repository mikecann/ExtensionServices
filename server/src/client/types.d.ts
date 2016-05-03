interface IErrorReport {
    comments: string;
    version: string;
    logs: ILog[] | string;
    email: string;
}

interface ILog {
    id: string;
    date: string;
    log: ILogEntry[];
}

interface ILogEntry {
    level: string;
    time: string;
    params: any[];
    stack?: string;
}

declare module "lzjs"
{
     export function compress(data: any): any;
     export function decompress(data: any): any;
     export function compressToBase64(data: any): string;
     export function decompressFromBase64(data: string): any;
}