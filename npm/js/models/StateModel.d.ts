import { Signal1 } from "../signals/Signals";
export declare class StateModel<T> {
    updated: Signal1<T>;
    private _state;
    private _initialState;
    constructor();
    init(initialState: T): Promise<void>;
    resetToInitial(): void;
    update(newState?: T): void;
    state: T;
}
