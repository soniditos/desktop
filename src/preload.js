const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, payload) => ipcRenderer.send(channel, payload),
  getMediaMetadata: () => navigator.mediaSession.metadata
});
