export class ChromeHelpers
{
    static getAllTabs() : Promise<chrome.tabs.Tab[]>
    {
        return new Promise<chrome.tabs.Tab[]>((resolve,reject) => {
            chrome.tabs.query({}, tabs => resolve(tabs));
        });
    }

   static getBackgroundPage() : Promise<Window>
    {
        return new Promise<Window>((resolve, reject) => {
            chrome.runtime.getBackgroundPage(page => resolve(page));
        });
    }

    static getActiveTab() : Promise<chrome.tabs.Tab>
    {
        return new Promise<chrome.tabs.Tab>((resolve, reject) => {           
            chrome.tabs.query({active: true, currentWindow: true}, tabs =>  resolve(tabs[0]));
        }); 
    }

    static sendMessage<T>(tab:chrome.tabs.Tab, message:any) : Promise<T>
    {
        return new Promise<T>((resolve, reject) => {           
            chrome.tabs.sendMessage(tab.id, message, response => {
                resolve(response);
            });
        }); 
    }
}