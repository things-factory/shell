module.exports = {
  port: 3000,
  uploads: 'uploads',
  SECRET: '0xD58F835B69D207A76CC5F84a70a1D0d4C79dAC95',
  logger: {
    file: {
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '2d',
      level: 'info'
    },
    console: {
      level: 'silly'
    }
  },
  storage: {
    /* storage configuration for file-system */
    type: 'file',
    base: 'attachments'
    /* storage configuration for s3-bucket
      type: 's3',
      accessKeyId: 'YOUR ACCESS KEY ID',
      secretAccessKey: 'YOUR SECRET ACCESS KEY',
      bucketName: 'YOUR S3 BUCKET NAME'
    */
  },
  ormconfig: {
    name: 'default',
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    logging: true
  },
  googleFontAPIKey: ''
}
