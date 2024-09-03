import { BaseEntity } from '../framework/BaseEntity';
import { Entity, Column } from 'typeorm';


/**
 * ScoreLog entity representing a log of scores in a game session.
 */
@Entity()
export class ScoreLog extends BaseEntity {

    /**
     * Constructor for the ScoreLog class.
     */
    public constructor(init?: Partial<ScoreLog>) {
        super();
        Object.assign(this, init);
    }

    /**
     * Identifier of the winning card. It can be either null or a UUID.
     */
    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public winner_card_id: string | null = null;

    /**
     * Identifier of the game session. It can be either null or a UUID.
     */
    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public game_session_id: string | null = null;

    /**
     * Identifier of the judge player. It can be either null or a UUID.
     */
    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public judge_player_id: string | null = null;

    /**
     * Identifier of the winning player. It can be either null or a UUID.
     */
    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public winner_player_id: string | null = null;

    /**
     * Array of player-selected card identifiers.
     */
    @Column({
        type     : 'simple-array',
        nullable : false })
    public player_selected_cards: string[] = [];
}
