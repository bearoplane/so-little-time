module.exports = {
  webpack: (config, { dev }) => {
    const externals = {
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }
    config.externals = typeof config.externals !== 'undefined' ?
      config.externals.push(externals) :
      [externals]

    return config
  }
}
