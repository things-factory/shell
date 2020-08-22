module.exports = {
  port: 3000,
  subdomainOffset: 2,
  logger: {
    file: {
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '2d',
      level: 'info'
    }
  },
  ormconfig: {
    name: 'default',
    type: 'sqlite',
    database: 'db.test.sqlite',
    synchronize: true,
    logging: true,
    logger: 'debug'
  },
  uploads: 'uploads'
}
