export const childrenResolver = {
  async children(_: any, { name }, context: any) {
    return [{ name }]
  }
}
