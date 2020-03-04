// ps https://github.com/GoogleChrome/puppeteer/issues/3120
module.exports = {
  launch: {
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--no-github-run',
      '--no-zygote',
      '--no-sandbox',
    ],
  },
};
