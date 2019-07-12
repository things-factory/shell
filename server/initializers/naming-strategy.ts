import { NamingStrategyInterface } from 'typeorm'
import { DefaultNamingStrategy } from 'typeorm'
import _ from 'lodash'

export class NamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName || _.snakeCase(targetName)
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return _.snakeCase(embeddedPrefixes.concat(customName || propertyName).join('_'))
  }
}
