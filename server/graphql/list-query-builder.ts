import { buildCondition } from './condition-builder'

export const buildQuery = function(queryBuilder: any, params: any) {
  const filters = params.filters
  const pagination = params.pagination
  const sortings = params.sortings

  if (filters && filters.length > 0) {
    filters.forEach((filter, index: number) => {
      const condition = buildCondition(`${queryBuilder.alias}.${filter.name}`, filter.operator, filter.value)
      if (index === 0) {
        queryBuilder.where(condition.clause)
        if (condition.parameters) queryBuilder.setParameters(condition.parameters)
      } else {
        queryBuilder.andWhere(condition.clause)
        if (condition.parameters) queryBuilder.setParameters(condition.parameters)
      }
    })
  }

  if (pagination && pagination.page > 0 && pagination.limit > 0) {
    queryBuilder.skip(pagination.limit * (pagination.page - 1))
    queryBuilder.take(pagination.limit)
  }

  if (sortings && sortings.length > 0) {
    sortings.forEach((sorting, index) => {
      if (index === 0) {
        queryBuilder.orderBy(`${queryBuilder.alias}.${sorting.name}`, sorting.desc ? 'DESC' : 'ASC')
      } else {
        queryBuilder.addOrderBy(`${queryBuilder.alias}.${sorting.name}`, sorting.desc ? 'DESC' : 'ASC')
      }
    })
  }
}
