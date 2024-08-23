import { BaseEntity } from '../framework/BaseEntity';
import { Entity, Column } from 'typeorm';


@Entity()
export class Feedback extends BaseEntity {

    public constructor(
        name       : string | null = null,
        email      : string | null = null,
        message    : string | null = null,
        game_code  : string | null = null,
        player_id  : string | null = null,
        session_id : string | null = null,
    ) {
        super();

        this.session_id = session_id;
        this.game_code  = game_code;
        this.player_id  = player_id;
        this.message    = message;
        this.email      = email;
        this.name       = name;
    }

    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public name: string | null = null;

    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public email: string | null = null;

    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public message: string | null = null;

    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public game_code: string | null = null;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public player_id: string | null = null;

    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public session_id: string | null = null;
}
