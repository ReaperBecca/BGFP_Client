const { app, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const WindowManager = require('./system/utils/windowManagers/windowTemplate.js');

// Configure auto-updater
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

// Update event handlers
autoUpdater.on('update-available', (info) => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Update Available',
        message: `Version ${info.version} is available. Downloading now...`,
        buttons: ['Ok']
    });
});

autoUpdater.on('update-downloaded', (info) => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Update Ready',
        message: `Version ${info.version} has been downloaded and will be installed on restart`,
        buttons: ['Restart Now', 'Later']
    }).then((buttonIndex) => {
        if (buttonIndex.response === 0) {
            autoUpdater.quitAndInstall();
        }
    });
});

app.whenReady().then(() => {
    // Check for updates immediately
    autoUpdater.checkForUpdates();
    
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