import { Modal, Flex, rem } from '@mantine/core';
import { PopupContent } from './PopupContent';
import { GameCardType } from '../../type';
import { PopupModalProps } from './type';
import { GameCard } from '../GameCard';
import { RFC } from '@app/ui/type';


export const PopupModal: RFC<PopupModalProps> = ({
    popupType, handleClosePopup,
}) => {
    return (
        <Modal
            onClose={handleClosePopup}
            withCloseButton={true}
            radius={rem(40)}
            centered={true}
            opened={true}
            size='lg'
            overlayProps={{
                backgroundOpacity : 0.12,
                blur              : 5,
            }}>
            <Flex
                pt='xl'
                pb='xl'
                bg='#000'
                style={{
                    borderRadius : rem(40),
                }}
                justify='center'>
                <GameCard
                    id='popup'
                    cardType={GameCardType.Children}>
                    <PopupContent popupType={popupType} />
                </GameCard>
            </Flex>
        </Modal>
    );
};
