import { Context } from 'koa'
import 'reflect-metadata'
import { getRepository } from 'typeorm'
import { Domain } from '../../../entities'
import { buildQuery } from '../../list-query-builder'
import { DomainList } from '../../types/domain/domain-list'
import { ListParam } from '../../types/list-param'

export const domainsResolver = {
  async domains(_: any, params: ListParam, context: Context): Promise<DomainList> {
    const queryBuilder = getRepository(Domain).createQueryBuilder()
    buildQuery(queryBuilder, params, context, false)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
