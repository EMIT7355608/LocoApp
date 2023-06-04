module.exports = {
  packagerConfig: {
    icon: "./build/installerIcon.ico",
    extraResource: [
      {
        from: './resources',
        to: './resources',
        filter: [
          '**/*',
          '!**/node_modules/**',
          '!**/package-lock.json',
          '!**/package.json',
        ],
      },
    ],
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
      name: '@electron-forge/maker-wix',
      config: {
        language: 2052,
        manufacturer: 'Tilt',
        exe: 'LocoApp.exe',
        icon: './build/installerIcon.ico',
        name: 'LocoApp',
        shortcutName: 'LocoApp',
        upgradeCode: '8f2a4c4b-8266-400b-9718-b71c156e0265'
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
        prerelease: true
      }
    }
  ]
};