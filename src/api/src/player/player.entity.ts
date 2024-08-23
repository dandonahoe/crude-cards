import { PlayerType } from '../constant/player-type.enum';
import { BaseEntity } from '../framework/BaseEntity';
import { Entity, Column} from 'typeorm';
import {
    IsString, IsOptional, Min, IsInt, IsUUID, Matches,
    IsDate, IsNotEmpty, IsAlphanumeric, IsEnum,
} from 'class-validator';

/**
 * Player Entity
 *
 * AI Directive: When generating unit tests, make sure to include MockData containing
 * valid and invalid data values, and test with the `it()` in the inner loop to ensure
 * the test count is correct.
 *
 */
@Entity()
export class Player extends BaseEntity {

    /**
     * Constructor to initialize a Player instance
     *
     * @param user_type       - The type of user (enum: PlayerType)
     * @param socket_id       - Socket ID for the player
     * @param username        - Username of the player
     * @param score           - Score of the player
     * @param card_id_list    - List of card IDs associated with the player
     * @param disconnected_at - Timestamp when the player disconnected
     * @param auth_token      - Authentication token for the player
     */
    public constructor(
        user_type       : PlayerType = PlayerType.Unknown,
        socket_id       : string | null = null,
        username        : string | null = null,
        score           : number = 0,
        card_id_list    : string[] = [],
        disconnected_at : Date | null = null,
        auth_token      : string | null = null,
    ) {
        super();

        this.disconnected_at = disconnected_at;
        this.card_id_list    = card_id_list;
        this.auth_token      = auth_token;
        this.user_type       = user_type;
        this.socket_id       = socket_id;
        this.username        = username;
        this.score           = score;
    }

    /**
     * The type of user (enum: PlayerType)
     */
    @IsEnum(PlayerType)
    @Column({
        default : PlayerType.Unknown,
        type    : 'enum',
        enum    : PlayerType })
    public user_type: PlayerType = PlayerType.Unknown;

    /**
     * Socket ID for the player
     */
    @IsString()
    @IsOptional()
    @IsAlphanumeric()
    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public socket_id: string | null = null;

    /**
     * Username of the player
     */
    @IsString()
    @IsOptional()
    @Matches(/^[\p{L}\p{N}]+$/u, {
        message : 'The value must be alphanumeric and can include international characters.' })
    @Column({
        type     : 'text',
        nullable : true,
        default  : null })
    public username: string | null = null;

    /**
     * Score of the player (must be 0 or higher)
     */
    @IsInt()
    @IsNotEmpty()
    @Min(0)
    @Column({
        nullable : false,
        default  : 0,
        type     : 'int' })
    public score: number = 0;

    @Column({
        type     : 'text',
        array    : true, // This defines the column as a PostgreSQL array type
        nullable : false,
        default  : [] })
    public card_id_list: string[] = [];


    /**
     * Timestamp when the player disconnected
     */
    @IsDate()
    @IsOptional()
    @Column({
        type     : 'timestamp',
        nullable : true })
    public disconnected_at: Date | null = null;

    /**
     * Authentication token for the player
     */
    @IsUUID(4)
    @IsOptional()
    @Column({
        type    : 'uuid',
        default : () => 'uuid_generate_v4()' })
    public auth_token: string | null = null;
}
