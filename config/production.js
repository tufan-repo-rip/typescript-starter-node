const resolve = require('resolve-dir');
const pkg = require('../package.json');
let [org, name] = pkg.name.replace(/@/, '').split('/');
name = name || org;

module.exports = {
  winston: {
    loggers: [{
      id: org
    }],
    levels: [
      'off',
      'error',
      'warn',
      'info',
      'http',
      'verbose',
      'debug',
      'silly'
    ],
    transports: [{
      name: 'console-log',
      level: 'info',
      type: 'Console',
      colorize: true,
      showLevel: true,
      json: false,
      stringify: true,
      timestamp: false,
      prettyPrint: (json) => JSON.stringify(json, null, 2)
    }, {
      name: 'file-log',
      level: 'silly',
      type: 'File',
      colorize: false,
      showLevel: true,
      timestamp: true,
      json: true,
      stringify: true,
      prettyPrint: (json) => JSON.stringify(json, null, 2),
      filename: resolve(`~/.${org}/${name}-log-${(new Date()).toISOString().replace(/:/g, '.')}.json`)
    }]
  }
}
