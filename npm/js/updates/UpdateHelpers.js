"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const FileHelpers_1 = require("../file/FileHelpers");
class UpdateHelpers {
    static loadLatest(url) {
        return __awaiter(this, void 0, Promise, function* () {
            var updates = yield FileHelpers_1.FileHelpers.loadJson(url);
            if (updates && updates.length > 0)
                return yield UpdateHelpers.loadUpdateNotes(updates[0]);
            return null;
        });
    }
    static load(url) {
        return __awaiter(this, void 0, Promise, function* () {
            var updates = yield FileHelpers_1.FileHelpers.loadJson(url);
            var all = updates.map(u => UpdateHelpers.loadUpdateNotes(u));
            var result = yield Promise.all(all);
            return result;
        });
    }
    static loadUpdateNotes(update) {
        return __awaiter(this, void 0, Promise, function* () {
            var notes = yield FileHelpers_1.FileHelpers.load("data/" + update.notes);
            update.notes = notes;
            return update;
        });
    }
}
exports.UpdateHelpers = UpdateHelpers;
