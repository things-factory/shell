import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users_notifications')
export class UserNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({
    nullable: false
  })
  userId: string

  @Column({
    nullable: false
  })
  subscription: string
}
