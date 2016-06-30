import {StateModel} from "./StateModel";
import {IStorage} from "../storage/IStorage";
import {SignalBinding} from "../signals/Signals";

export class StateModelPersistance
{
    private storageId : string;
    private updateBinding : SignalBinding;

    constructor(private model:StateModel<any>, private storage:IStorage)
    {
    }

    async init(storageId:string) : Promise<void>
    {
        this.storageId = storageId;
        await this.depersist();
    }

    private async depersist() : Promise<void>
    {
        var data = await this.storage.get(this.storageId);
        this.model.update(data);
        this.model.updated.add(data => this.persist(data));
    }

    private async persist(data:any) : Promise<void>
    {
        await this.storage.set(this.storageId, data);        
    }

    destroy()
    {
        this.model.updated.remove(this.updateBinding);
    }
}