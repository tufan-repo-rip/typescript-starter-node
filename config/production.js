module.exports = {
  winston: {
    level: 'info',
    transports: [{
      colorize: true,
      showLevel: true,
      json: false,
      stringify: true,
      timestamp: false,
      level: 'info',
      prettyPrint: (json) => JSON.stringify(json, null, 2)
    }],
    loggers: [{
      // id: 'tufan'
    }]
  }
}
