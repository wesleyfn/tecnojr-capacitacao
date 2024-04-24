import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import { Student } from "../../student/entities/student.entity";
import { SolicitationStatusEnum } from "../../../common/enum/status.enum";

@Entity({ name: 'solicitation', orderBy: { id: 'ASC' } })
export class Solicitation {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @Column({ name: 'description', type: 'varchar', length: 500, nullable: false })
    description: string;

    @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ name: 'updated_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ name: 'status', type: 'varchar', length: 20, default: SolicitationStatusEnum.RECEBIDO })
    status: SolicitationStatusEnum;

    @Column({ name: 'studentId', nullable: false })
    studentId: string;

    @OneToOne(() => Student, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'studentId', referencedColumnName: 'id' })
    student: Student;
}
