"use strict";
const Signals_1 = require("../signals/Signals");
class StateModel {
    constructor() {
        this.updated = new Signals_1.Signal();
    }
    init(initialState) {
        this._state = initialState;
        this._initialState = initialState;
        this.updated.dispatch(this._state);
    }
    resetToInitial() {
        this._state = Object.assign({}, this._initialState);
        this.updated.dispatch(this._state);
    }
    update(newState) {
        this._state = Object.assign({}, this._state, newState);
        this.updated.dispatch(this._state);
    }
    get state() {
        return this._state;
    }
}
exports.StateModel = StateModel;
