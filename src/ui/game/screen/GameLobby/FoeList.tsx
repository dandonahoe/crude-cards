import { GameCardCentered, GameCardChildren } from "../../component/GameCard"
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameText } from "../../component/GameText"
import { GameFoe } from "../../component/GameFoe"
import { FoeListProps } from "./type"
import { List } from "@mantine/core"
import { RFC } from "@app/ui/type"


export const FoeList : RFC<FoeListProps> = ({
    foes, gameCode,
}) => {
    if(foes.length === 0)
        return (
            <GameCardCentered color={CardColor.White}>
                <GameText>
                    {`No Players Yet, Share Game Code "${gameCode}" to Invite People`}
                </GameText>
            </GameCardCentered>
        )

    return (
        <GameCardChildren color={CardColor.White}>
            <GameText>
                {'Other Players'}
            </GameText>
            <List>
                {foes.map(player => (
                    <List.Item key={player.id}>
                        <GameFoe player={player} />
                    </List.Item>
                ))}
            </List>
        </GameCardChildren>
    )
}
