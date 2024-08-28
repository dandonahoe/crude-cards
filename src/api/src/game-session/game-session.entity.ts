import { GameStage } from '../constant/game-stage.enum';
import { BaseEntity } from '../framework/BaseEntity';
import { Entity, Column } from 'typeorm';


@Entity()
export class GameSession extends BaseEntity {

    @Column({
        type    : 'enum',
        enum    : GameStage,
        default : GameStage.Unknown })
    public game_stage: GameStage = GameStage.Unknown;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public lobby_host_id: string | null = null;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public dealer_id: string | null = null;

    @Column({
        type     : 'simple-array',
        nullable : false })
    public dealer_card_id_list: string[] = [];

    @Column({ default : 0 })
    public hand_number: number = 0;

    @Column({ default : 0 })
    public round_number: number = 0;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public dealer_card_id: string | null = null;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public champion_player_id: string | null = null;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public game_id: string | null = null;

    @Column({
        type     : 'uuid',
        nullable : true,
        default  : null })
    public current_score_log_id: string | null = null;

    @Column('uuid', { array : true })
    public player_id_list: string[] = [];

    @Column('uuid', { array : true })
    public disconnected_player_id_list: string[] = [];

    @Column('uuid', { array : true })
    public limbo_player_id_list: string[] = [];

    @Column({
        type     : 'simple-array',
        nullable : false })
    public black_cards: string[] = [];

    @Column({
        type     : 'simple-array',
        nullable : false })
    public white_cards: string[] = [];

    @Column({
        type     : 'simple-array',
        nullable : false })
    public used_black_cards: string[] = [];

    @Column({
        type     : 'simple-array',
        nullable : false })
    public used_white_cards: string[] = [];

    @Column({
        type     : 'simple-array',
        nullable : false })
    public selected_card_id_list: string[] = [];

    @Column({
        type     : 'timestamp',
        nullable : true })
    public completed_at: Date | null = null;
}
