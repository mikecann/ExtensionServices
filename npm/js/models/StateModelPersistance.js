"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class StateModelPersistance {
    constructor(model, storage) {
        this.model = model;
        this.storage = storage;
    }
    init(storageId) {
        return __awaiter(this, void 0, Promise, function* () {
            this.storageId = storageId;
            yield this.depersist();
        });
    }
    depersist() {
        return __awaiter(this, void 0, Promise, function* () {
            var data = yield this.storage.get(this.storageId);
            this.model.update(data);
            this.model.updated.add(data => this.persist(data));
        });
    }
    persist(data) {
        return __awaiter(this, void 0, Promise, function* () {
            yield this.storage.set(this.storageId, data);
        });
    }
    destroy() {
        this.model.updated.remove(this.updateBinding);
    }
}
exports.StateModelPersistance = StateModelPersistance;
