import {Signal, Signal1} from "../signals/Signals";

export class StateModel<T>
{
    updated: Signal1<T>;

    private _state : T;    
    private _initialState : T;    

    constructor()
    {
        this.updated = new Signal();
    }

    init(initialState:T)
    {
        this._state = initialState;
        this._initialState = initialState;
        this.updated.dispatch(this._state);
    }

    resetToInitial()
    {
        this._state = Object.assign({}, this._initialState);
        this.updated.dispatch(this._state);
    } 

    update(newState?:T)
    {
        this._state = Object.assign({}, this._state, newState);
        this.updated.dispatch(this._state);
    }

    get state() : T
    {
        return this._state;
    }
}