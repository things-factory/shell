import { databaseInitializer } from '../../server/initializers/database'

describe('orm', () => {
  var connection

  beforeAll(async () => {
    connection = await databaseInitializer()
  })

  afterAll(async () => {
    await connection.close()
  })

  beforeEach(async () => {
    const entities = connection.entityMetadatas

    entities.forEach(async entity => {
      const repository = connection.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName}`)
    })
  })

  it('creates a user', () => {
    // TODO
  })
})
