import { Context } from 'koa'
import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Domain } from '../../entities'
import { buildQuery } from '../list-query-builder'
import { CreateDomainInput } from '../types/domain/create-domain-input'
import { DomainList } from '../types/domain/domain-list'
import { UpdateDomainInput } from '../types/domain/domain-patch'
import { ListParam } from '../types/list-param'

@Resolver(Domain)
export class DomainResolver {
  constructor(@InjectRepository(Domain) private readonly domainRepository: Repository<Domain>) {}

  @Query(returns => Domain)
  async domain(@Arg('name') name: string) {
    return this.domainRepository.findOne({ name })
  }

  @Query(returns => DomainList)
  async domains(@Args() params: ListParam, @Ctx() context: Context & Record<string, any>) {
    const queryBuilder = this.domainRepository.createQueryBuilder()
    buildQuery(queryBuilder, params, context, false)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }

  @Mutation(returns => Domain)
  async createDomain(@Arg('domain') domain: CreateDomainInput) {
    return this.domainRepository.save(domain)
  }

  @Mutation(returns => Boolean)
  async deleteDomain(@Arg('name') name: string) {
    return this.domainRepository.delete({ name })
  }

  @Mutation(returns => Domain)
  async updateDomain(@Args() { name, patch }: UpdateDomainInput) {
    const repository = this.domainRepository
    const domain = await repository.findOne({ name })

    return await repository.save({
      ...domain,
      ...patch
    })
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
