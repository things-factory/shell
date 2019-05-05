import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Setting, Domain, CommonCode } from '../entities'

const SEED_SETTING = [
  {
    name: 'Setting 1'
  },
  {
    name: 'Setting 2'
  }
]

export class SeedSetting1556864112795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Setting)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    const commonCodeRepository = getRepository(CommonCode)
    const foundCode = await commonCodeRepository.findOne(
      { name: 'CATEGORIES' },
      {
        relations: ['commonCodeDetails']
      }
    )

    try {
      SEED_SETTING.forEach(async setting => {
        await repository.save({
          ...setting,
          domainId: domain.id,
          category: foundCode.commonCodeDetails[0].name
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Setting)
    SEED_SETTING.forEach(async setting => {
      let recode = await repository.findOne({ name: setting.name })
      await repository.remove(recode)
    })
  }
}
