import { Field, ArgsType } from 'type-graphql'
import { Filter } from './filter'
import { Pagination } from './pagination'
import { Sorting } from './sorting'

@ArgsType()
export class ListParam {
  @Field(type => [Filter], { nullable: 'itemsAndList' })
  filters?: Filter[]
  @Field(type => Pagination, { nullable: true })
  pagination?: Pagination
  @Field(type => [Sorting], { nullable: 'itemsAndList' })
  sortings?: Sorting[]
}
