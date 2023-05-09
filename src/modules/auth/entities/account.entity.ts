import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'text' })
    username: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'text' })
    role: string;

    @Column({ type: 'text', nullable: true })
    refreshToken: string;

    @CreateDateColumn({ type: 'timestamp without time zone',  })
    createdAt: string;

    @Column({ type: 'timestamp without time zone', nullable: true })
    updatedAt: string;

}