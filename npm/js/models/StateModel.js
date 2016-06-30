"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Signals_1 = require("../signals/Signals");
class StateModel {
    constructor() {
        this.updated = new Signals_1.Signal();
    }
    init(initialState) {
        return __awaiter(this, void 0, void 0, function* () {
            this._state = initialState;
            this._initialState = initialState;
            this.updated.dispatch(this._state);
        });
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
