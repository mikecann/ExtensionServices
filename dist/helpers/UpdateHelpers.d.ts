export interface IUpdate {
    date: string;
    version: string;
    notes: string;
}
export declare class UpdateHelpers {
    static loadLatest(url?: string): Promise<IUpdate>;
    static load(url?: string): Promise<IUpdate[]>;
    static loadUpdateNotes(update: IUpdate): Promise<IUpdate>;
}
