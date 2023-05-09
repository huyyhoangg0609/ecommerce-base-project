import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'text', nullable: false })
    accountId: string;

    @Column({ type: 'text', nullable: true })
    alias: string;
    
    @Column({ type: 'text', nullable: true })
    gender: string;

    @Column({ type: 'text', nullable: true })
    dob: string;

    @Column({ type: 'text', nullable: true })
    phone: string;

    @Column({ type: 'text', nullable: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    address: string;
    
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

}