'use strict'
import windowStateKeeper from 'electron-window-state'
import { app, protocol, BrowserWindow, Menu, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import store from './store'

const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

async function createWindow() {

  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });

  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 610,
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    titleBarStyle: 'hidden',
    transparent: true,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  win.setMenuBarVisibility(false);

  mainWindowState.manage(win);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }


  ipcMain.on('toggle-window-size', () => {
    if (win.isMaximized()){
        win.unmaximize();
    } else {
        win.maximize();
    }
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

store.subscribe((mutation) => {
  console.log(mutation)
})
