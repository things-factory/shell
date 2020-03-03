import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Parent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({
    nullable: true
  })
  description: string
}
