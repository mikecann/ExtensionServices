import { FileHelpers } from "./FileHelpers";

export interface IUpdate {
    date: string;
    version: string;
    notes: string;
}

export class UpdateHelpers
{
    static async loadLatest(url: string = "data/updates.json"): Promise<IUpdate> {        
        var updates = await FileHelpers.loadJson<IUpdate[]>(url);
        if (updates && updates.length>0)
            return await UpdateHelpers.loadUpdateNotes(updates[0]);
        
        return null;
    }

    static async load(url: string = "data/updates.json"): Promise<IUpdate[]> {
        var updates = await FileHelpers.loadJson<IUpdate[]>(url);          
        var all = updates.map(u => UpdateHelpers.loadUpdateNotes(u));
        var result = await Promise.all(all);
        return result as any;
    }

    static async loadUpdateNotes(update: IUpdate): Promise<IUpdate> {
        var notes = await FileHelpers.load("data/" + update.notes);
        update.notes = notes;
        return update;
    }
}

