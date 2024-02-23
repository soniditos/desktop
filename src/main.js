const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const rpc = require('discord-rpc');
const trayIconPath = path.join(__dirname, './assets/tray-icon.png');
const { autoUpdater } = require('electron-updater');

let win;
let tray;
let client;

function createWindow() {
  win = new BrowserWindow({
    width: 1366,
    height: 920,
    minWidth: 1366,
    minHeight: 920,
    center: true,
    show: true,
    frame: true,
    vibrancy: 'window',
    background: '#0a0a0b',
    icon: path.join(__dirname, './src/assets/tray-icon.png'),
    titleBarStyle: 'default',
    titleBarOverlay: {
      color: '#0a0a0b'
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    },
    backgroundColor: '#0a0a0b'
  });

  win.loadURL('https://soniditos.com');

  client = new rpc.Client({ transport: 'ipc' });
  const configPath = path.resolve(__dirname, '..', 'config.json');

  win.webContents.on('did-finish-load', () => {
    try {
      const config = require(configPath);

      client.login({ clientId: config.ClientID }).catch(console.error);

      client.on('ready', () => {
        async function updatePresence() {
          const mediaTitlePromise = win.webContents.executeJavaScript('navigator.mediaSession.metadata ? navigator.mediaSession.metadata.title : null');
          const mediaTitle = await mediaTitlePromise;

          const mediaArtistPromise = win.webContents.executeJavaScript('navigator.mediaSession.metadata ? navigator.mediaSession.metadata.artist : null');
          const mediaArtist = await mediaArtistPromise;

          const mediaAlbumPromise = win.webContents.executeJavaScript('navigator.mediaSession.metadata ? navigator.mediaSession.metadata.album : null');
          const mediaAlbum = await mediaAlbumPromise;

          const mediaArtworkPromise = win.webContents.executeJavaScript('navigator.mediaSession.metadata ? navigator.mediaSession.metadata.artwork[0].src : null');
          const mediaArtwork = await mediaArtworkPromise;

          const startTimeElement = await win.webContents.executeJavaScript('document.querySelector("div.text-xs.text-muted.flex-shrink-0.min-w-40.text-right span").textContent');
          const startTime = startTimeElement ? startTimeElement.trim() : null;

          const cuedMediaId = await win.webContents.executeJavaScript('localStorage.getItem("player.web-player.cuedMediaId")');

          client.request('SET_ACTIVITY', {
            pid: process.pid,
            activity: {
              details: `${mediaArtist} - ${mediaTitle}`,
              timestamps: {
                start: startTime ? Date.now() - parseTimestamp(startTime) : null,
              },
              assets: {
                large_image: mediaArtwork,
                large_text: mediaAlbum,
              },
              buttons: [
                {
                  label: config.Button1,
                  url: `https://soniditos.com/track/${encodeURIComponent(cuedMediaId)}/${encodeURIComponent(mediaArtist)}`
                },
              ],
              type: 2
            }
          });
        }
        
        setInterval(updatePresence, 1000);
      });
    } catch (error) {
      console.error('Error loading config:', error.message);
      console.error('Error en la función updatePresence:', error.message);
    }
  });

  win.setMenuBarVisibility(false);

  win.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      win.hide();
    }
  });
}

function parseTimestamp(timestamp) {
  const [minutes, seconds] = timestamp.split(':');
  return (parseInt(minutes, 10) * 60 + parseInt(seconds, 10)) * 1000;
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
    autoUpdater.autoDownload = true;
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