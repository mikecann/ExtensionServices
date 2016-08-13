import { IUpdate } from "./Updates";
export declare class UpdateHelpers {
    static loadLatest(url: string): Promise<IUpdate>;
    static load(url: string): Promise<IUpdate[]>;
    static loadUpdateNotes(update: IUpdate): Promise<IUpdate>;
}
