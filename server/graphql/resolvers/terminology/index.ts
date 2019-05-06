import { terminologyResolver } from './terminology'
import { terminologiesResolver } from './terminologies'

import { updateTerminology } from './update-terminology'
import { createTerminology } from './create-terminology'
import { deleteTerminology } from './delete-terminology'

export const Query = {
  ...terminologiesResolver,
  ...terminologyResolver
}

export const Mutation = {
  ...updateTerminology,
  ...createTerminology,
  ...deleteTerminology
}
