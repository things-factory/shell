export const parentResolver = {
  async parent(_: any, { name }, context: any) {
    return { name: 'Parent' }
  }
}
