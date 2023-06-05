const { app } = require('electron');
const squirrelStartupEvent = process.argv[1];
const squirrelEvent = process.argv[2];
const squirrelValue = process.argv[3];
const path = require('path');

if (squirrelEvent === '--squirrel-install' || squirrelEvent === '--squirrel-updated') {
  // 创建桌面快捷方式
  const shortcutName = 'Loco';
  const shortcutPath = path.join(app.getPath('desktop'), `${shortcutName}.lnk`);
  const targetPath = process.execPath;
  const iconPath = path.join(__dirname, 'icon.ico');
  const shell = require('electron').shell;
  const shortcutArgs = '';

  try {
    const shortcut = require('windows-shortcuts');
    shortcut.create(
      shortcutPath,
      targetPath,
      shortcutArgs,
      iconPath,
      (error) => {
        if (error) {
          console.error(`Failed to create shortcut: ${error}`);
        } else {
          console.log(`Shortcut created: ${shortcutPath}`);
          shell.showItemInFolder(shortcutPath);
        }
      }
    );
  } catch (error) {
    console.error(`Failed to create shortcut: ${error}`);
  }
}