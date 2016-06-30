import { StateModel } from "./StateModel";
import { IStorage } from "../storage/IStorage";
export declare class StateModelPersistance {
    private model;
    private storage;
    private storageId;
    private updateBinding;
    constructor(model: StateModel<any>, storage: IStorage);
    init(storageId: string): Promise<void>;
    private depersist();
    private persist(data);
    destroy(): void;
}
