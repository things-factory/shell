import { Domain } from '../../../entities'
import { InputType, Field } from 'type-graphql'

@InputType()
export class CreateDomainInput implements Partial<Domain> {
  @Field()
  subdomain: string
}
