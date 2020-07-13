import { Field, ObjectType, Int } from 'type-graphql'
import { Domain } from '../../../entities'

@ObjectType()
export class DomainList {
  @Field(type => [Domain])
  items: Domain[]
  @Field(type => Int)
  total: number
}
