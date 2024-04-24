import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'student', orderBy: { id: 'ASC' } })
export class Student {
    @PrimaryColumn({ name: 'id', type: 'character', length: 9})
    id: string;

    @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ name: 'password', type: 'varchar', length: 65, select: false})
    password: string;

    @Column({ name: 'name', type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'craa', type: 'decimal', scale: 2, default: 0.0 })
    craa: number;

    @Column({ name: 'status', type: 'varchar', length: 20, default: 'Regular' })
    status: string;
}
