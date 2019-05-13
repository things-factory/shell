const glob = require('glob')
const path = require('path')

export var migrations = []

glob.sync(path.resolve(__dirname, './**/*.js')).forEach(function(file) {
  if (file.indexOf('index.js') !== -1) return
  migrations = migrations.concat(Object.values(require(path.resolve(file))) || [])
})
