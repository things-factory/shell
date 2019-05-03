import { MigrationInterface, QueryRunner, Repository } from 'typeorm'
import { getRepository } from 'typeorm'
import { User, Domain } from '../entities'

const SEED_USERS = [
  {
    email: 'admin@hatiolab.com',
    password: 'admin',
    userType: 'admin'
  }
]

export class seedUsers1525758367829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(User)
    const domainRepository = getRepository(Domain)
    const foundDomains = await domainRepository.find()

    try {
      SEED_USERS.forEach(async user => {
        await repository.save({
          ...user,
          domainId: foundDomains[0].id,
          password: User.encode(user.password)
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(User)

    SEED_USERS.reverse().forEach(async user => {
      let record = await repository.findOne({ email: user.email })
      await repository.remove(record)
    })
  }
}
