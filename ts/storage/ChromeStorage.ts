import {IStorage} from "mikeysee-typescript-helpers";

export class ChromeStorage implements IStorage
{
    constructor(private area:chrome.storage.StorageArea)
    {
    }

    get<T>(key:string) : Promise<T>
    {
        return new Promise<T>((resolve, reject) => {            
            this.area.get(key, items => resolve(items[key]));
        });
    }

    set(key:string, value:any) : Promise<void>
    {
        return new Promise<void>((resolve, reject) => {
            this.area.set({[key]: value}, ()=> resolve());
        });
    }

    remove(key:string) : Promise<void>
    {
         return new Promise<void>((resolve, reject) => {
            this.area.remove(key, () => resolve());
        });
    }
}