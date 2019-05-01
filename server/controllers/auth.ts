import { getRepository } from 'typeorm'
import { User } from '../entities'

export async function signup(attrs) {
  const repository = getRepository(User)

  const old = await repository.findOne({ email: attrs.email })
  if (old) {
    throw new Error('user duplicated.')
  }

  const newattrs = {
    userType: 'user',
    ...attrs,
    password: User.encode(attrs.password)
  }

  const user = await repository.save({ ...newattrs })

  return await signin({
    email: attrs.email,
    password: attrs.password
  })
}

export async function signin(attrs) {
  const repository = getRepository(User)

  const user = await repository.findOne({ email: attrs.email })

  if (!user) {
    throw new Error('user notfound.')
  }

  if (!user.verify(attrs.password)) {
    throw new Error('password not match.')
  }

  return await user.sign()
}

export async function authcheck(email) {
  const repository = getRepository(User)

  const user = await repository.findOne({ email })

  if (!user) {
    throw new Error('user notfound.')
  }

  return await user.sign()
}
