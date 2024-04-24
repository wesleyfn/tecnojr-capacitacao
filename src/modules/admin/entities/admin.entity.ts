import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'admin' })
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'email', type: 'varchar', length: 255, unique: true})
    email: string;

    @Column({ name: 'password', type: 'varchar', length: 65, select: false })
    password: string;
}
