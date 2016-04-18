"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class FileHelpers {
    static loadJson(fileUrl) {
        return __awaiter(this, void 0, Promise, function* () {
            var contents = yield this.load(fileUrl);
            return JSON.parse(contents);
        });
    }
    static load(fileUrl) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.responseText);
                    }
                    else {
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.open("GET", chrome.extension.getURL(fileUrl), true);
            xhr.send();
        });
    }
}
exports.FileHelpers = FileHelpers;
