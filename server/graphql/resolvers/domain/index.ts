import { domainResolver } from './domain'
import { domainsResolver } from './domains'

import { updateDomain } from './update-domain'
import { createDomain } from './create-domain'
import { deleteDomain } from './delete-domain'

export const Query = {
  ...domainResolver,
  ...domainsResolver
}

export const Mutation = {
  ...updateDomain,
  ...createDomain,
  ...deleteDomain
}
