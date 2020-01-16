import * as sleepUtil from '@things-factory/utils/src/sleep'

export function sleep(ms) {
  console.warn(`sleep is deprecated. please use @things-factory/utils's instead of @things-factory/shell's`)
  return sleepUtil.sleep(ms)
}
