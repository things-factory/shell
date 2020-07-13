import { AnyScalarType, AnyScalar } from './any-scalar'
import { ObjectType, InputType, Field } from 'type-graphql'

@InputType()
export class Filter {
  @Field()
  name: string
  @Field({ nullable: true, defaultValue: 'eq' })
  operator?: string

  @Field({ nullable: true })
  relation?: boolean

  @Field(type => AnyScalarType)
  value: AnyScalar
}
