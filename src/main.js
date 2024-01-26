const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const rpc = require('discord-rpc');
const trayIconPath = path.join(__dirname, './assets/tray-icon.png');
const { autoUpdater } = require('electron-updater');

let win;
let tray;

function createWindow() {
  win = new BrowserWindow({
    width: 1366,
    height: 920,
    minWidth: 1366,
    minHeight: 920,
    icon: path.join(__dirname, './src/assets/tray-icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    },
    backgroundColor: '#0f0f0f', 
  });

  win.loadURL('https://soniditos.com');

  const client = new rpc.Client({ transport: 'ipc' });
  const configPath = path.resolve(__dirname, '..', 'config.json');

  try {
    const config = require(configPath);

    client.login({ clientId: config.ClientID }).catch(console.error);

    client.on('ready', () => {
      console.log('[DEBUG] Presence now active!')
      console.log('[WARN] Do not close this Console as it will terminate the rpc')
      console.log('=================== Error Output ===================')
      client.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: {
          details: config.Details,
          // state: config.State,
          timestamps: {
            start: Date.now()
          },
          assets: {
            large_image: config.LargeImage,
            large_text: config.LargeImageText,
          },
          buttons: [
            {
              label: config.Button1,
              url: config.Url1
            },
            {
              label: config.Button2,
              url: config.Url2
            },
          ]
        }
      });
    });
  } catch (error) {
    console.error('Error loading config:', error.message);
  }

  win.setMenuBarVisibility(false);

  win.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      win.hide();
    }
  });

  // win.on('minimize', (event) => {
  //   event.preventDefault();
  //   win.hide();
  // });
}

function createTray() {
  tray = new Tray(trayIconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mostrar aplicación',
      click: () => {
        win.show();
      }
    },
    {
      label: 'Quitar',
      click: () => {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('soniditos.com');
  tray.setContextMenu(contextMenu);

  tray.on('double-click', () => {
    win.show();
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  
  if (!app.isPackaged) {
    autoUpdater.autoDownload = false;
  } else {
    autoUpdater.checkForUpdatesAndNotify();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    tray.destroy();
    app.quit();
  }
});

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (e) => {
    e.preventDefault();

    const singleInstance = BrowserWindow.getAllWindows()[0];
    if (!singleInstance.isVisible()) singleInstance.show();
    if (singleInstance.isMinimized()) singleInstance.maximize();
  });
}

