
const { app, BrowserWindow } = require('electron');
console.log('Hello from Electron')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // 禁用node.js集成，以增强安全性
      contextIsolation: true, // 启用上下文隔离，以增强安全性
      enableRemoteModule: false // 禁用remote模块，以增强安全性
    }
  });

  // 加载网站
  mainWindow.loadURL('http://172.31.86.192:4399/');

  // 打开开发者工具
  mainWindow.webContents.openDevTools();

  // 关闭窗口时清空引用
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

// 在所有窗口关闭时退出应用程序
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});