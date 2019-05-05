import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, getRepository } from 'typeorm'

import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { BaseEntity } from './base-entity'

const SECRET = '0xD58F835B69D207A76CC5F84a70a1D0d4C79dAC95'

@Entity('user')
export class User extends BaseEntity {
  @Column('text')
  email: string

  @Column('text', {
    nullable: true
  })
  password: string

  @Column('text', {
    nullable: true
  })
  userType: string // defulat: 'user, enum: 'user', 'admin'

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  /* signing for jsonwebtoken */
  async sign() {
    var user = {
      email: this.email,
      userType: this.userType
    }

    return await jwt.sign(user, SECRET, {
      expiresIn: '7d',
      issuer: 'hatiolab.com',
      subject: 'user'
    })
  }

  /* encode password */
  static encode(password: string) {
    return crypto
      .createHmac('sha1', SECRET)
      .update(password)
      .digest('base64')
  }

  /* verify password */
  verify(password: string) {
    const encrypted = crypto
      .createHmac('sha1', SECRET)
      .update(password)
      .digest('base64')

    return this.password === encrypted
  }

  /* verify jsonwebtoken */
  static async check(token: string) {
    var decoded = await jwt.verify(token, SECRET)

    const repository = getRepository(User)
    var user = await repository.findOne(decoded.email)

    if (!user) {
      throw new Error('user notfound.')
    }

    return decoded
  }
}
