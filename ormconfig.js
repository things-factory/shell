module.exports = {
  name: 'default',
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  logging: true,
  entities: ['dist-server/entities/**/*.js', 'node_modules/@things-factory/*/dist-server/entities/**/*.js'],
  migrations: ['dist-server/migrations/**/*.js', 'node_modules/@things-factory/*/dist-server/migrations/**/*.js'],
  subscribers: ['dist-server/subscribers/**/*.js', 'node_modules/@things-factory/*/dist-server/subscribers/**/*.js']
}
