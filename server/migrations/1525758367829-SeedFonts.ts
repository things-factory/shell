import { MigrationInterface, QueryRunner, Repository } from 'typeorm'

import { getRepository } from 'typeorm'
import { Font } from '../entities'

const SEED_FONTS = ['Roboto', 'Pangolin', 'Railway', 'Slabo', 'Skranji']

export class seedFonts1525758367829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Font)

    SEED_FONTS.forEach(async font => {
      await repository.save({
        name: font,
        provider: 'google',
        uri: '',
        path: '',
        active: false
      })
    })
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Font)

    SEED_FONTS.reverse().forEach(async font => {
      let record = await repository.findOne({ name: font })
      await repository.remove(record)
    })
  }
}
