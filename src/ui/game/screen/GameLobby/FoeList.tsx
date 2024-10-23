import { GameCardCentered, GameCardChildren } from "../../component/GameCard"
import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameStack } from "../../component/GameStack";
import { GameText } from "../../component/GameText"
import { GameBox } from "../../component/GameBox";
import { GameFoe } from "../../component/GameFoe"
import { FoeListProps } from "./type"
import { List } from "@mantine/core"
import { RFC } from "@app/ui/type"


export const FoeList : RFC<FoeListProps> = ({
    foes, gameCode,
}) => {
    if(foes.length === 0)
        return (
            <GameCardCentered color={CardColor.Black}>
                <GameText>
                    {`No Players Yet, Share Game Code "${gameCode}" to Invite People`}
                </GameText>
            </GameCardCentered>
        )

    return (
        <GameCardChildren color={CardColor.Black}>
            <GameBox color={CardColor.White}>
                <GameStack>
                    <GameText size='md'>
                        {'Other Players'}
                    </GameText>
                    <List>
                        {foes.map(player => (
                            <List.Item key={player.id}>
                                <GameFoe player={player} />
                            </List.Item>
                    ))}
                    </List>
                </GameStack>
            </GameBox>
        </GameCardChildren>
    )
}
