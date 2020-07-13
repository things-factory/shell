import { Field, InputType } from 'type-graphql'

@InputType()
export class Sorting {
  @Field()
  name: string
  @Field()
  desc: boolean
}
