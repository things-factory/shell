/* babel 등 transpilor 환경에서는 적용될 수 없으니, 사용하지 말 것 */
export const isAsync = func => func.constructor.name === 'AsyncFunction'
