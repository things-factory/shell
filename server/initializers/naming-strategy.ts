import _ from 'lodash'
import pluralize from 'pluralize'
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm'

export class NamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName || pluralize(_.snakeCase(targetName))
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return _.snakeCase(embeddedPrefixes.concat(customName || propertyName).join('_'))
  }
}
