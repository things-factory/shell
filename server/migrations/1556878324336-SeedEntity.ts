import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Resource, Domain } from '../entities'

const SEED_ENTITIES = [
  {
    name: 'System',
    bundle: 'System',
    tableName: 'table-sample'
  }
]

export class SeedEntity1556878324336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Resource)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    try {
      SEED_ENTITIES.forEach(async entity => {
        await repository.save({
          ...entity,
          domainId: domain.id
        })

        let foundEntity = await repository.findOne({ name: entity.name })
        await repository.save({
          name: `${entity.name} detail`,
          domainId: foundEntity.domainId,
          parentId: foundEntity.id,
          bundle: foundEntity.bundle,
          tableName: `${entity.name}-detail`
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
      let child = await repository.findOne({ name: `${entity.name}-detail` })

      await repository.remove(child)
      await repository.remove(record)
    })
  }
}
