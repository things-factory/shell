import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', {
    unique: true
  })
  name: string

  @Column('text', {
    nullable: true
  })
  description: string

  @Column('text', {
    nullable: true
  })
  parentId: string

  @ManyToOne(type => Menu, parent => parent.children)
  parent: Menu

  @OneToMany(type => Menu, child => child.parent)
  children: Menu[]

  @Column('text', {
    nullable: true
  })
  template: string

  @Column('text', {
    nullable: true
  })
  menuType: string

  @Column('text', {
    nullable: true
  })
  category: string

  @Column('int', {
    nullable: true
  })
  rank: number

  @Column('text', {
    nullable: true
  })
  iconPath: string

  @Column('boolean', {
    nullable: true
  })
  hiddenFlag: boolean

  @Column('text', {
    nullable: true
  })
  routing: string

  @Column('text', {
    nullable: true
  })
  routingType: string

  @Column('text', {
    nullable: true
  })
  detailFormId: string

  @Column('text', {
    nullable: true
  })
  detailLayout: string

  @Column('text', {
    nullable: true
  })
  resourceType: string

  @Column('text', {
    nullable: true
  })
  resourceName: string

  @Column('text', {
    nullable: true
  })
  resourceUrl: string

  @Column('text', {
    nullable: true
  })
  gridSaveUrl: string

  @Column('text', {
    nullable: true
  })
  idField: string

  @Column('text', {
    nullable: true
  })
  titleField: string

  @Column('boolean', {
    nullable: true
  })
  pagination: boolean

  @Column('text', {
    nullable: true
  })
  itemsProp: string

  @Column('text', {
    nullable: true
  })
  totalProp: string

  @Column('int', {
    nullable: true
  })
  fixedColumns: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
