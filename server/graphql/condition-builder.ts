import _ from 'lodash'

export const buildCondition = function (
  alias: string,
  fieldName: string,
  operator: string,
  value: any,
  relation: boolean,
  seq: number
) {
  seq++

  fieldName = _.snakeCase(fieldName)

  switch (operator) {
    case 'eq':
      return {
        clause: `"${alias}"."${fieldName}" = :args${seq}`,
        parameters: { [`args${seq}`]: value }
      }

    case 'like':
      return {
        clause: `"${alias}"."${fieldName}" LIKE :args${seq}`,
        parameters: { [`args${seq}`]: `${value}` }
      }

    case 'i_like':
      return {
        clause: `LOWER("${alias}"."${fieldName}") LIKE :args${seq}`,
        parameters: { [`args${seq}`]: `${String(value).toLowerCase()}` }
      }

    case 'nlike':
      return {
        clause: `"${alias}"."${fieldName}" NOT LIKE :args${seq}`,
        value: { [`args${seq}`]: `${value}` }
      }

    case 'i_nlike':
      return {
        clause: `LOWER("${alias}"."${fieldName}") NOT LIKE :args${seq}`,
        value: { [`args${seq}`]: `${String(value).toLowerCase()}` }
      }

    case 'lt':
      return {
        clause: `"${alias}"."${fieldName}" < :args${seq}`,
        parameters: { [`args${seq}`]: value }
      }

    case 'gt':
      return {
        clause: `"${alias}"."${fieldName}" > :args${seq}`,
        parameters: { [`args${seq}`]: value }
      }

    case 'lte':
      return {
        clause: `"${alias}"."${fieldName}" <= :args${seq}`,
        parameters: { [`args${seq}`]: value }
      }

    case 'gte':
      return {
        clause: `"${alias}"."${fieldName}" >= :args${seq}`,
        parameters: { [`args${seq}`]: value }
      }

    case 'noteq':
      return {
        clause: `"${alias}"."${fieldName}" != :args${seq}`,
        parameters: { [`args${seq}`]: value }
      }

    case 'in':
      const clause = relation
        ? `"${fieldName}"."id" IN (:...args${seq})`
        : `"${alias}"."${fieldName}" IN (:...args${seq})`
      value = value?.length ? value : [value]
      return {
        clause,
        parameters: { [`args${seq}`]: value }
      }
    case 'notin':
      value = value?.length ? value : [value]
      return {
        clause: `"${alias}"."${fieldName}" NOT IN (:...args${seq})`,
        parameters: { [`args${seq}`]: value }
      }

    case 'notin_with_null':
      value = value?.length ? value : [value]
      return {
        clause: `("${alias}"."${fieldName}" IS NULL OR "${alias}"."${fieldName}" NOT IN (:...args${seq}))`,
        parameters: { [`args${seq}`]: value }
      }

    case 'is_null':
      return {
        clause: `"${alias}"."${fieldName}" IS NULL`
      }
    case 'is_not_null':
      return {
        clause: `"${alias}"."${fieldName}" IS NOT NULL`
      }
    case 'is_false':
      return {
        clause: `"${alias}"."${fieldName}" IS FALSE`
      }
    case 'is_true':
      return {
        clause: `"${alias}"."${fieldName}" IS TRUE`
      }
    case 'is_not_false':
      return {
        clause: `"${alias}"."${fieldName}" IS NOT FALSE`
      }
    case 'is_not_true':
      return {
        clause: `"${alias}"."${fieldName}" IS NOT TRUE`
      }
    case 'is_present':
      return {
        clause: `"${alias}"."${fieldName}" IS PRESENT`
      }
    case 'is_blank':
      return {
        clause: `"${alias}"."${fieldName}" IS BLANK`
      }
    case 'is_empty_num_id':
      return {
        clause: `"${alias}"."${fieldName}" IS EMPTY NUMERIC ID`
      }

    case 'between':
      return {
        clause: `"${alias}"."${fieldName}" BETWEEN  :args${seq}-1 AND :args${seq}-2`,
        parameters: { [`args${seq}-1`]: value[0], [`args${seq}-2`]: value[1] }
      }
  }
}
