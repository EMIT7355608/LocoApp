
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

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
    //mainWindow.webContents.openDevTools();

    // 关闭窗口时清空引用
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    // 检查更新
    configureAutoUpdater()
    autoUpdater.checkForUpdatesAndNotify();

}

app.on('ready', createWindow);

// 监听自动更新事件
autoUpdater.on('update-available', () => {
    console.log('Update available');
});

autoUpdater.on('update-not-available', () => {
    console.log('No update available');
});

autoUpdater.on('error', (err) => {
    console.error('Error while checking for updates', err);
});

autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded', info);
    autoUpdater.quitAndInstall();
});

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
    // 设置更新源的URL
    autoUpdater.setFeedURL({
        provider: 'github',
        owner: 'EMIT7355608',
        repo: 'LocoApp',
        // 如果您的应用程序为预发布版本，请在此处设置预发布标签
        // prerelease: true,
    })

    // 监听更新可用事件
    autoUpdater.on('update-available', (info) => {
        const message = `A new version (${info.version}) is available. Do you want to download it now?`
        const index = dialog.showMessageBoxSync({
            type: 'question',
            buttons: ['Yes', 'No'],
            message,
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
    })

    // 监听自动更新错误事件
    autoUpdater.on('error', (error) => {
        console.error(error)
        dialog.showErrorBox('Error', error == null ? 'unknown' : (error.stack || error).toString())
    })
}