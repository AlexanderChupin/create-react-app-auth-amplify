// jest-puppeteer.config.js
module.exports = {
    server: {
        command: 'react-scripts src/server.js',
        port: 3000,
    },
    launch: {
        dumpio: true,
        headless: process.env.HEADLESS !== 'false',
    },
    browser: 'chromium',
    browserContext: 'default'
}