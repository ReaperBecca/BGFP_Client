const { BrowserWindow } = require('electron');
const MenuManager = require('./menuTemplate.js');

class WindowManager {
    constructor() {
        this.windows = new Map();
        this.menuManager = new MenuManager(this);
        this.menuManager.setupMainMenu();
    }

    createWindow(name, options) {
        const window = new BrowserWindow({
            ...options,
            icon: './system/images/favicon.ico'
        });
        this.windows.set(name, window);
        return window;
    }

    getWindow(name) {
        return this.windows.get(name);
    }

    createPopupWindow(name, options) {
        const url = options.url;
        delete options.url;

        const window = new BrowserWindow({
            ...options,
            icon: './system/images/favicon.ico',
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true
            }
        });

        if (url) {
            window.loadURL(url);
        }

        this.windows.set(name, window);

        window.on('closed', () => {
            this.windows.delete(name);
        });

        return window;
    }
}

module.exports = new WindowManager();