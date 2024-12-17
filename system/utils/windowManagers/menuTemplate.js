const { Menu, shell, app } = require('electron');
const { autoUpdater } = require('electron-updater');

class MenuManager {
    constructor(windowManager) {
        this.windowManager = windowManager;
    }

    setupMainMenu() {
        const template = [
            {
                label: 'Navigation',
                submenu: [
                    {
                        label: 'Brimstone Games Website',
                        click: () => shell.openExternal('https://brimstone.games')
                    },
                    {
                        label: 'Discord',
                        click: () => shell.openExternal('https://discord.gg/brimstone')
                    },
                    {
                        label: 'Login with Discord',
                        click: () => this.windowManager.createPopupWindow('discordLogin', {
                            width: 800,
                            height: 600,
                            title: 'Discord Login',
                            webPreferences: {
                                nodeIntegration: false,
                                contextIsolation: true
                            },
                            autoHideMenuBar: true,
                            modal: true,
                            parent: this.windowManager.getWindow('main'),
                            url: 'https://discord.com/oauth2/authorize?client_id=900249595609751592&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=identify+guilds+guilds.channels.read+guilds.join+gdm.join+dm_channels.read+presences.write+dm_channels.messages.write+messages.read+activities.read+relationships.write+role_connections.write+presences.read+activities.write+guilds.members.read+connections+email'
                        })
                    }
                ]
            },
            {
                label: 'Developer',
                submenu: [
                    {
                        label: 'Force Update & Restart',
                        click: async () => {
                            await autoUpdater.checkForUpdates();
                            await autoUpdater.downloadUpdate();
                            autoUpdater.quitAndInstall(false, true);
                        }
                    }
                ]
            },
            {
                label: 'Maintenance',
                submenu: [
                    {
                        label: 'Fresh Install',
                        click: async () => {
                            await autoUpdater.checkForUpdates();
                            await autoUpdater.downloadUpdate();
                            autoUpdater.quitAndInstall(true, true);
                        }
                    },
                    { type: 'separator' },
                    {
                        label: 'Reset Application',
                        click: () => {
                            const mainWindow = this.windowManager.getWindow('main');
                            mainWindow.loadURL('https://reaperbecca.github.io/Brimstone_Games_Fan_Portal/');
                        }
                    },
                    {
                        label: 'Force Quit and Reload',
                        accelerator: process.platform === 'darwin' ? 'Cmd+Shift+R' : 'Ctrl+Shift+R',
                        click: () => {
                            app.relaunch();
                            app.exit(0);
                        }
                    }
                ]
            },
            {
                label: 'Test',
                submenu: [
                    {
                        label: 'Test Menu',
                        click: () => {
                            console.log('Test Menu Clicked');
                        }
                    }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }
}

module.exports = MenuManager;