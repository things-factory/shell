export async function domainContext({ ctx }) {
  const domain = ctx && ctx.state && ctx.state.user && ctx.state.user.domain

  if (domain) {
    ctx.domain = domain
  }

  return ctx
}
