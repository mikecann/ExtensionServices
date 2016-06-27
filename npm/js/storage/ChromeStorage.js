"use strict";
class ChromeStorage {
    constructor(area) {
        this.area = area;
    }
    get(key) {
        return new Promise((resolve, reject) => {
            this.area.get(key, items => resolve(items[key]));
        });
    }
    set(key, value) {
        return new Promise((resolve, reject) => {
            this.area.set({ [key]: value }, () => resolve());
        });
    }
    remove(key) {
        return new Promise((resolve, reject) => {
            this.area.remove(key, () => resolve());
        });
    }
}
exports.ChromeStorage = ChromeStorage;
