export declare class ChromeHelpers {
    static getAllTabs(): Promise<chrome.tabs.Tab[]>;
    static getBackgroundPage(): Promise<Window>;
    static getActiveTab(): Promise<chrome.tabs.Tab>;
    static sendMessage<T>(tab: chrome.tabs.Tab, message: any): Promise<T>;
}
