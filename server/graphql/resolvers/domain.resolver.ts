import { Domain } from '../../entities'
import { Arg, Query, Resolver } from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

@Resolver(Domain)
export class DomainResolver {
  constructor(@InjectRepository(Domain) private readonly domainRepository: Repository<Domain>) {}

  @Query(returns => Domain)
  async domain(@Arg('id') id: string) {
    return this.domainRepository.findOne(id)
  }

  @Query(returns => [Domain])
  domains() {
    return this.domainRepository.find()
  }

  // @Mutation(returns => Domain)
  // @Authorized()
  // addDomain(@Arg('newDomainData') newDomainData: NewDomainInput, @Ctx('user') user: User): Promise<Domain> {
  //   return this.DomainService.addNew({ data: newDomainData, user })
  // }

  // @Mutation(returns => Boolean)
  // @Authorized(Roles.Admin)
  // async removeDomain(@Arg('id') id: string) {
  //   try {
  //     await this.DomainService.removeById(id)
  //     return true
  //   } catch {
  //     return false
  //   }
  // }
}
