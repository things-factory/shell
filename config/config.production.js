module.exports = {
  port: 3000,
  logger: {
    file: {
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '200m',
      maxFiles: '1m',
      level: 'info'
    }
  },
  uploads: 'uploads'
}
