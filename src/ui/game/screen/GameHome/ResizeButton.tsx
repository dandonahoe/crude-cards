import { CardColor } from '../../../../api/src/constant/card-color.enum';
import { GameAction } from "@app/client/action/game.action";
import { GameTextSmall } from "../../component/GameText";
import { useDispatch } from "@app/client/hook";
import { Button } from "@mantine/core";
import { Env } from "@app/Env";


export const ResizeButton = () => {

    const dispatch = useDispatch();
    const homepageUrl = Env.getValue<string>('NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN');

    const handleResize = (): void => {
        dispatch(
            GameAction.logRelay({
                message : 'User clicked the resize button',
                payload : {
                    hello : 'world',
                },
            }),
        );

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
