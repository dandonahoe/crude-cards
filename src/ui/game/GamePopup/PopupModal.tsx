import { Modal, Flex, rem } from '@mantine/core';
import { PopupContent } from './PopupContent';
import { PopupModalProps } from './type';
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
            size='sm'
            overlayProps={{
                backgroundOpacity : 0.12,
                blur              : 5,
            }}>
            <Flex
                p='xl'
                justify='center'>
                <PopupContent popupType={popupType} />
            </Flex>
        </Modal>
    );
};
