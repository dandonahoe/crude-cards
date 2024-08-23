import { BaseEntity } from '../framework/BaseEntity';
import { Entity, Column } from 'typeorm';


@Entity()
export class Game extends BaseEntity {

    /**
     * Creates an instance of the Game class.
     *
     * @param max_round_count    - The maximum number of rounds in the game.
     * @param max_point_count    - The maximum number of points in the game.
     * @param host_player_id     - The ID of the host player.
     * @param game_code          - The unique code for the game.
     * @param current_session_id - The current session ID.
     */
    public constructor(
    ) {
        super();

        this.current_session_id = null;
        this.max_round_count    = 0;
        this.max_point_count    = 0;
        this.host_player_id     = null;
        this.game_code          = null;
    }


    /**
     * The maximum number of rounds in the game.
     */
    @Column({
        nullable : false,
        default  : 0,
        type     : 'integer' })
    public max_round_count: number = 0;


    /**
     * The maximum number of points in the game.
     */
    @Column({
        nullable : false,
        default  : 0,
        type     : 'integer' })
    public max_point_count: number = 0;


    /**
     * The ID of the host player.
     */
    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public host_player_id: string | null = null;


    /**
     * The unique code for the game.
     */
    @Column({
        type     : 'text',
        nullable : true})
    public game_code: string | null = null;


    /**
     * The current session ID.
     */
    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public current_session_id: string | null = null;
}
