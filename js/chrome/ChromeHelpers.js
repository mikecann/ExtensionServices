export class ChromeHelpers {
    static getAllTabs() {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({}, tabs => resolve(tabs));
        });
    }
    static getBackgroundPage() {
        return new Promise((resolve, reject) => {
            chrome.runtime.getBackgroundPage(page => resolve(page));
        });
    }
    static getActiveTab() {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => resolve(tabs[0]));
        });
    }
    static sendMessage(tab, message) {
        return new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(tab.id, message, response => {
                resolve(response);
            });
        });
    }
}
