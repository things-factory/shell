export async function context({ req }) {
  const { Domain } = require('@things-factory/shell')
  const { getRepository } = require('typeorm')

  return {
    domain: await getRepository(Domain).findOne({ name: 'SYSTEM' })
  }
}
