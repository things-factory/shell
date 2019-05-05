import { MigrationInterface, QueryRunner, Repository } from 'typeorm'

import { getRepository } from 'typeorm'
import { Font, Domain } from '../entities'

const SEED_FONTS = ['Roboto', 'Pangolin', 'Railway', 'Slabo', 'Skranji']

export class seedFonts1556862253039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Font)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    SEED_FONTS.forEach(async font => {
      await repository.save({
        name: font,
        domainId: domain.id,
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
