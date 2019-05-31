export const buildCondition = function(fieldName: string, operator: string, value: any) {
  switch (operator) {
    case 'eq':
      return {
        clause: `${fieldName} = :${fieldName}`,
        parameters: { [fieldName]: value }
      }

    case 'like':
      return {
        clause: `${fieldName} LIKE :${fieldName}`,
        parameters: { [fieldName]: `%${value}%` }
      }

    case 'nlike':
      return {
        clause: `${fieldName} NOT LIKE :${fieldName}`,
        value: { [fieldName]: `(${value})` }
      }

    case 'lt':
      return {
        clause: `${fieldName} < :${fieldName}`,
        parameters: { [fieldName]: value }
      }

    case 'gt':
      return {
        clause: `${fieldName} > :${fieldName}`,
        parameters: { [fieldName]: value }
      }

    case 'lte':
      return {
        clause: `${fieldName} <= :${fieldName}`,
        parameters: { [fieldName]: value }
      }

    case 'gte':
      return {
        clause: `${fieldName} >= :${fieldName}`,
        parameters: { [fieldName]: value }
      }

    case 'noteq':
      return {
        clause: `${fieldName} != :${fieldName}`,
        parameters: { [fieldName]: value }
      }

    case 'in':
      return {
        clause: `${fieldName} IN :${fieldName}`,
        parameters: { [fieldName]: `(${value})` }
      }

    case 'notin':
      return {
        clause: `${fieldName} NOT IN :${fieldName}`,
        parameters: { [fieldName]: `(${value})` }
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
        clause: `${fieldName} BETWEEN  :args1 AND :args2`,
        parameters: { args1: value[0], args2: value[1] }
      }
  }
}
