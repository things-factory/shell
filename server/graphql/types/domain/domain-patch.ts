import { ArgsType, Field, InputType } from 'type-graphql'
import { Domain } from '../../../entities'
import Partial from '../../mixins/partial'

@InputType()
export class DomainPatch extends Partial(Domain) {

}

@ArgsType()
export class UpdateDomainInput {
  @Field()
  name: string
  @Field(type => DomainPatch)
  patch: DomainPatch
}
