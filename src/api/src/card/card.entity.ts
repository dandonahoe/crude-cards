import { EnumValidator } from '../decorators/EnumValidator';
import { CardColor } from '../constant/card-color.enum';
import { BaseEntity } from '../framework/BaseEntity';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Entity, Column } from 'typeorm';

/**
 * Represents a card entity.
 */
@Entity()
export class Card extends BaseEntity {

    /**
     * The color of the card.
     */
    @IsEnum(CardColor, { message : 'Invalid card color' })
    @EnumValidator(CardColor, CardColor.Unknown)
    @Column({
        type    : 'enum',
        enum    : CardColor,
        default : CardColor.Unknown,
    })
    public color: CardColor = CardColor.Unknown;

    /**
     * The text content of the card.
     */
    @IsNotEmpty()
    @Column({
        type     : 'text',
        nullable : true,
        default  : null,
    })
    public text: string | null = '';

    /**
     * Constructs a new instance of the Card class.
     *
     * @param color - The color of the card.
     * @param  text - The text content of the card.
     */
    public constructor(
        color: CardColor = CardColor.Unknown,
        text: string | null = '',
    ) {
        super();
        this.color = color;
        this.text = text;
    }
}
