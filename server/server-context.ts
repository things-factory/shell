export async function context({ ctx }) {
  // TODO: 서브도메인으로 도메인 판별 가능할 경우 해당 정보를 바탕으로
  //       ctx의 도메인을 초기화 하도록 수정해야 함
  const domain = ctx && ctx.state && ctx.state.user && ctx.state.user.domain

  if (domain) {
    ctx.state.domain = domain
  }

  return ctx
}
