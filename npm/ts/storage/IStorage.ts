export interface IStorage
{
    get<T>(key:string) : Promise<T>;
    set(key:string, value:any) : Promise<void>;
    remove(key) : Promise<void>;
}