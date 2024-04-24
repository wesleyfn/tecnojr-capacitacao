import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reviewer' })
export class Reviewer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 65, select: false })
  password: string;
}
