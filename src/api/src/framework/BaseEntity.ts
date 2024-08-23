import { PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


export class BaseEntity {
    // use class-validator to allow either undefined or a uuid

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null,
    })
    public created_by: string | null = null;

    @CreateDateColumn()
    public created_at: Date | null = null;

    @CreateDateColumn()
    public updated_at: Date | null = null;

    @Column({
        type     : 'text',
        nullable : true,
        default  : null})
    public title: string | null = null;
}
