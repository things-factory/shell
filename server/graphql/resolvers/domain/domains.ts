import { getRepository } from 'typeorm'
import { Domain } from '../../../entities'
import { buildQuery } from '../../list-query-builder'
import { ListParam } from '../../types/list-param'

export const domainsResolver = {
  async domains(_: any, params: typeof ListParam, context: any) {
    const queryBuilder = getRepository(Domain).createQueryBuilder()
    buildQuery(queryBuilder, params, context, false)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
