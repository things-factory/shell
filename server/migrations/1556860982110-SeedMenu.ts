import { MigrationInterface, QueryRunner } from 'typeorm'
import { getRepository } from 'typeorm'
import { Menu, Domain } from '../entities'

const SEED_MENUS = [
  {
    name: 'System'
  }
]

export class SeedMenu1556860982110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Menu)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({ name: 'SYSTEM' })

    try {
      SEED_MENUS.forEach(async menu => {
        await repository.save({
          ...menu,
          domain
        })
        let foundMenu = await repository.findOne({ name: menu.name })

        console.log('00000000000000000000000', foundMenu.domain)

        await repository.save({
          name: `${menu.name} children`,
          domain,
          parent: foundMenu
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Menu)

    SEED_MENUS.reverse().forEach(async menu => {
      let record = await repository.findOne({ name: menu.name })
      await repository.remove(record)
    })
  }
}
