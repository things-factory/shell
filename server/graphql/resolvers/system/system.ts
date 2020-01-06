import { pubsub } from '../../../pubsub'

export const systemRebooted = {
  systemRebooted: {
    /* subscription payload can be filtered here */
    // resolve(payload, args) {
    //   return payload.systemRebooted
    // },
    subscribe(_, args, { ctx }) {
      /* it is possible to check authentication here */
      // if (!ctx.user) {
      //   return null
      // }
      return pubsub.asyncIterator('systemRebooted')
    }
  }
}
