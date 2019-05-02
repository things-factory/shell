import { MigrationInterface, QueryRunner } from 'typeorm'
import { getRepository } from 'typeorm'
import { Menu } from '../entities'

const SEED_MENUS = [
  {
    name: 'System'
  }
]

export class SeedMenu1556791108085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Menu)

    try {
      SEED_MENUS.forEach(async menu => {
        await repository.save({
          ...menu
        })

        let foundMenu = await repository.findOne({ name: menu.name })
        await repository.save({
          name: menu.name + 'children',
          parentId: foundMenu.id
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
