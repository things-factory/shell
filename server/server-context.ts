import { getRepository } from 'typeorm'
import { URL } from 'url'
import { Domain } from './entities/domain'
import { getPathInfo } from './utils/context-path'
export async function context({ ctx }) {
  // TODO: 서브도메인으로 도메인 판별 가능할 경우 해당 정보를 바탕으로
  //       ctx의 도메인을 초기화 하도록 수정해야 함

  var { request } = ctx
  var { header } = request
  var { referer } = header
  var { pathname } = new URL(referer)
  var { domain } = getPathInfo(pathname)

  var domainObj = {}

  if (domain) {
    var repo = getRepository(Domain)
    var d = await repo.findOne({
      where: [{ subdomain: domain }],
      cache: true
    })

    if (d) {
      domainObj = d
    }
  }

  ctx.state.domain = domainObj

  return ctx
}
