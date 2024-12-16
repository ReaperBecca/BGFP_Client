const { app } = require('electron');
const { autoUpdater } = require('electron-updater');
const WindowManager = require('./system/utils/windowManagers/windowTemplate.js');

// Enable auto-updates
autoUpdater.checkForUpdatesAndNotify();

app.whenReady().then(() => {
    // Create main window using the WindowManager
    WindowManager.createWindow('main', {
        width: 800,
        height: 600,
        title: 'Brimstone Games Fan Portal',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    WindowManager.getWindow('main').loadURL('https://reaperbecca.github.io/Brimstone_Games_Fan_Portal/');
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
