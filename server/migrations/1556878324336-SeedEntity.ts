import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Resource, Domain } from '../entities'

const SEED_ENTITIES = [
  {
    name: 'System'
  }
]

export class SeedEntity1556878324336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Resource)
    const domainRepository = getRepository(Domain)
    const foundDomains = await domainRepository.find()

    try {
      SEED_ENTITIES.forEach(async entity => {
        await repository.save({
          ...entity,
          domainId: foundDomains[0].id,
          bundle: 'System'
        })

        let foundEntity = await repository.findOne({ name: entity.name })
        await repository.save({
          name: `${entity.name} children`,
          domainId: foundEntity.domainId,
          parentId: foundEntity.id
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Resource)

    SEED_ENTITIES.reverse().forEach(async entity => {
      let record = await repository.findOne({ name: entity.name })
      await repository.remove(record)
    })
  }
}
