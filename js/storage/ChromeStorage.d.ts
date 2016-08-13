import { IStorage } from "./IStorage";
export declare class ChromeStorage implements IStorage {
    private area;
    constructor(area: chrome.storage.StorageArea);
    get<T>(key: string): Promise<T>;
    set(key: string, value: any): Promise<void>;
    remove(key: string): Promise<void>;
}
