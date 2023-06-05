
const { app, autoUpdater, BrowserWindow,Tray,dialog  } = require('electron');
const path = require('path');
const squirrelStartup = require('electron-squirrel-startup');
console.log('Hello from Electron');

if (squirrelStartup) {
    app.quit();
}

let mainWindow;

process.env.GITHUB_TOKEN = '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';
configureAutoUpdater()

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: false, // 禁用node.js集成，以增强安全性
            contextIsolation: true, // 启用上下文隔离，以增强安全性
            enableRemoteModule: false // 禁用remote模块，以增强安全性
        }
    });
    const tray = new Tray(path.join(__dirname, '../assets/icon.ico'))
    // 加载网站
    mainWindow.loadURL('http://172.31.86.192:4399/');

    autoUpdater.checkForUpdates();
    // 检查更新
    // 打开开发者工具
    //mainWindow.webContents.openDevTools();

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


function configureAutoUpdater() {
    /**/
    autoUpdater.setFeedURL({
        
    url: 'https://github.com/EMIT7355608/LocoApp/releases/latest/download'
    })
 /*
    // 设置更新源的URL
    autoUpdater.setFeedURL({
        provider: 'github',
        owner: 'EMIT7355608',
        repo: 'LocoApp',
        releaseType: 'release',
        private: false,
        // 如果您的应用程序为预发布版本，请在此处设置预发布标签
        // prerelease: true,
    })

    // 监听更新可用事件
    
    autoUpdater.on('update-available', (info) => {
        const message = `A new version (${info.version}) is available. Do you want to download it now?`
        const index = dialog.showMessageBoxSync({
            type: 'question',
            message,
            buttons: ['Yes', 'No'],
        })
        if (index === 0) {
            autoUpdater.downloadUpdate()
        }
    })

    // 监听更新下载进度事件
    autoUpdater.on('download-progress', (progressObj) => {
        const { bytesPerSecond, percent, transferred, total } = progressObj
        console.log(`Download speed: ${bytesPerSecond} B/s`)
        console.log(`Progress: ${percent}%`)
        console.log(`Transferred: ${transferred} bytes`)
        console.log(`Total: ${total} bytes`)
    })

    // 监听更新下载完成事件
    autoUpdater.on('update-downloaded', (info) => {
        const message = `A new version (${info.version}) has been downloaded. Do you want to install it now?`
        const index = dialog.showMessageBoxSync({
            type: 'question',
            buttons: ['Yes', 'No'],
            message,
        })
        if (index === 0) {
            autoUpdater.quitAndInstall()
        }
    }) */
    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
        const dialogOpts = {
          type: 'info',
          buttons: ['重启', '稍后'],
          title: '应用程序更新',
          message: process.platform === 'win32' ? releaseNotes : releaseName,
          detail:
            '已经下载了新版本，是否重启应用程序以应用更新？'
        }
      
        dialog.showMessageBox(dialogOpts).then((returnValue) => {
          if (returnValue.response === 0) autoUpdater.quitAndInstall()
        })
      })
    // 监听自动更新错误事件
    autoUpdater.on('error', (error) => {
        console.error(error)
        dialog.showErrorBox('Error', error == null ? 'unknown' : (error.stack || error).toString())
    })
}