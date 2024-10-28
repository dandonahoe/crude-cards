import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameBoardContext } from '../../../GameBoardContext';
import { GameAction } from "@app/client/action/game.action";
import { GameTextSmall } from "../../component/GameText";
import { useDispatch } from "@app/client/hook";
import { Button } from "@mantine/core";
import { useContext } from 'react';
import { Env } from "@app/Env";


export const ResizeButton = () => {

    const dispatch = useDispatch();
    const homepageUrl = Env.getValue<string>('NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN');

    const { gameStateDTO : { game_code }} = useContext(GameBoardContext);

    const handleResize = (): void => {
        dispatch(GameAction.webLogRelay({
            game_code,
            message : 'User clicked the resize button',
            payload : { hello : 'world' },
        }));

        window.open(homepageUrl, 'CrudeCards', 'width=550,height=850');
    };

    return (
        <Button
            color={CardColor.White}
            onClick={handleResize}
            c={CardColor.White}
            variant='outline'
            tabIndex={0}
            size='md'>
            <GameTextSmall>
                {'Resize'}
            </GameTextSmall>
        </Button>
    );
};
