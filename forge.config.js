
module.exports = {
  packagerConfig: {
    icon: "./build/installerIcon.ico"
  },
  rebuildConfig: {},
  github_repository: {
    owner: "EMIT7355608",
    name: "LocoApp"
  },
  entryPoints: [
    "src/main.js"
  ],
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "LocoApp",
        setupIcon: "./build/installerIcon.ico",
        loadingGif: "assets/load.gif",
        shortcutFolders: ["$DESKTOP", "$START_MENU\\Programs\\MyApp"],
        allowToChangeInstallationDirectory: true
      }
    }
  ],
  build: {
    appId: "com.tilt.locoapp",
    productName: "LocoApp",
    nsis: {
      installerIcon: "./assets/app.ico",
      allowElevation: true,
      oneClick: false,
      allowToChangeInstallationDirectory: true,
      createDesktopShortcut: true
    }
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'EMIT7355608',
          name: 'LocoApp'
        },
        prerelease: false,
        private: false
      }
    }
  ],
  "publish": {
    "provider": "github",
    "owner": "EMIT7355608",
    "repo": "LocoApp",
  }
};