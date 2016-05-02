export class FileHelpers {
    
    static async loadJson<T>(fileUrl: string): Promise<T> {        
        var contents = await this.load(fileUrl);
        return JSON.parse(contents);
    }

    static load(fileUrl: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.open("GET", chrome.extension.getURL(fileUrl), true);
            xhr.send();
        });
    }
    
}

