export const buildCondition = function(
  fieldName: string,
  operator: string,
  value: string,
  relation: boolean,
  seq: number
) {
  seq++

  switch (operator) {
    case 'eq':
      return {
        clause: `${fieldName} = :args${seq}`,
        parameters: { [`args${seq}`]: value }
      }

    case 'like':
      return {
        clause: `${fieldName} LIKE :args${seq}`,
        parameters: { [`args${seq}`]: `${value}` }
      }

    case 'i_like':
      return {
        clause: `LOWER(${fieldName}) LIKE :args${seq}`,
        parameters: { [`args${seq}`]: `${String(value).toLowerCase()}` }
      }

    case 'nlike':
      return {
        clause: `${fieldName} NOT LIKE :args${seq}`,
        value: { [`args${seq}`]: `${value}` }
      }

    case 'i_nlike':
      return {
        clause: `LOWER(${fieldName}) NOT LIKE :args${seq}`,
        value: { [`args${seq}`]: `${String(value).toLowerCase()}` }
      }

    case 'lt':
      return {
        clause: `${fieldName} < :args${seq}`,
        parameters: { [`args${seq}`]: value }
      }

    case 'gt':
      return {
        clause: `${fieldName} > :args${seq}`,
        parameters: { [`args${seq}`]: value }
      }

    case 'lte':
      return {
        clause: `${fieldName} <= :args${seq}`,
        parameters: { [`args${seq}`]: value }
      }

    case 'gte':
      return {
        clause: `${fieldName} >= :args${seq}`,
        parameters: { [`args${seq}`]: value }
      }

    case 'noteq':
      return {
        clause: `${fieldName} != :args${seq}`,
        parameters: { [`args${seq}`]: value }
      }

    case 'in':
      const clause = relation ? `${fieldName}.id IN (:args${seq})` : `${fieldName} IN (:args${seq})`
      return {
        clause,
        parameters: { [`args${seq}`]: `(${value})` }
      }
    case 'notin':
      return {
        clause: `${fieldName} NOT IN (:args${seq})`,
        parameters: { [`args${seq}`]: `(${value})` }
      }

    case 'is_null':
      return {
        clause: `${fieldName} IS NULL`
      }
    case 'is_not_null':
      return {
        clause: `${fieldName} IS NOT NULL`
      }
    case 'is_false':
      return {
        clause: `${fieldName} IS FALSE`
      }
    case 'is_true':
      return {
        clause: `${fieldName} IS TRUE`
      }
    case 'is_not_false':
      return {
        clause: `${fieldName} IS NOT FALSE`
      }
    case 'is_not_true':
      return {
        clause: `${fieldName} IS NOT TRUE`
      }
    case 'is_present':
      return {
        clause: `${fieldName} IS PRESENT`
      }
    case 'is_blank':
      return {
        clause: `${fieldName} IS BLANK`
      }
    case 'is_empty_num_id':
      return {
        clause: `${fieldName} IS EMPTY NUMERIC ID`
      }

    case 'between':
      return {
        clause: `${fieldName} BETWEEN  :args${seq}-1 AND :args${seq}-2`,
        parameters: { [`args${seq}-1`]: value[0], [`args${seq}-2`]: value[1] }
      }
  }
}
