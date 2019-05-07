import { permitUrlResolver } from './permit-url'
import { permitUrlsResolver } from './permit-urls'

import { updatePermitUrl } from './update-permit-url'
import { createPermitUrl } from './create-permit-url'
import { deletePermitUrl } from './delete-permit-url'

export const Query = {
  ...permitUrlsResolver,
  ...permitUrlResolver
}

export const Mutation = {
  ...updatePermitUrl,
  ...createPermitUrl,
  ...deletePermitUrl
}
