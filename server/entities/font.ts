import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('fonts')
export class Font {
  @PrimaryColumn()
  name: string // Font Family Name for google / custom, ID for typekit

  @Column('text', {
    nullable: false
  })
  provider: string // custom, typekit, google,

  @Column('text', {
    nullable: true
  })
  uri: string // For typekit, custom,

  @Column('text', {
    nullable: true
  })
  path: string // Uploaded path for custom

  @Column('boolean')
  active: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
