import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain, CommonCode, CommonCodeDetail } from '../entities'

const SEED_COMMON_CODE_DETAILS = {
  CATEGORIES: [
    {
      rank: 10,
      name: 'CATEGORY_1',
      description: 'Category 1'
    },
    {
      rank: 20,
      name: 'CATEGORY_2',
      description: 'Category 2'
    },
    {
      rank: 30,
      name: 'CATEGORY_3',
      description: 'Category 3'
    }
  ]
}

export class SeedCommonCodeDetail1556864012905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({
      name: 'SYSTEM'
    })

    const parentRepository = getRepository(CommonCode)
    const repository = getRepository(CommonCodeDetail)

    try {
      for (let categoryName in SEED_COMMON_CODE_DETAILS) {
        const foundParent = await parentRepository.findOne({ name: categoryName })

        SEED_COMMON_CODE_DETAILS[categoryName].forEach(async categoryDetail => {
          await repository.save({
            ...categoryDetail,
            parent: foundParent,
            domain
          })
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(CommonCodeDetail)
    for (let categoryName in SEED_COMMON_CODE_DETAILS) {
      SEED_COMMON_CODE_DETAILS[categoryName].reverse().forEach(async commonCodeDetail => {
        let recode = await repository.findOne({ name: commonCodeDetail.name })
        await repository.remove(recode)
      })
    }
  }
}
