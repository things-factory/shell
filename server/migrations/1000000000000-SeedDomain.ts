import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '../entities'

const SEED_DOMAINS = [
  {
    name: 'SYSTEM',
    subdomain: 'system',
    systemFlag: true
  }
]

export class SeedDomain1000000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Domain)

    try {
      SEED_DOMAINS.forEach(async domain => {
        await repository.save({
          ...domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Domain)

    SEED_DOMAINS.reverse().forEach(async domain => {
      let recode = await repository.findOne({ name: domain.name })
      await repository.remove(recode)
    })
  }
}
