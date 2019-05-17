export async function context({ ctx }) {
  const { Domain } = require('@things-factory/shell')
  const { getRepository } = require('typeorm')

  return {
    ...ctx,
    domain: await getRepository(Domain).findOne({ name: 'SYSTEM' })
  }
}
