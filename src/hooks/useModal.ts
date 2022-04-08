import React from 'react';

interface ModalOptions {
    isOpen: boolean;
    formRef: React.RefObject<HTMLFormElement>;
    onOpen(): void;
    onModalClose(): void;
}

export const useModal = (onClose?: () => void): ModalOptions => {
    const [isOpen, setIsOpen] = React.useState(false);
    const formRef = React.useRef<HTMLFormElement>(null);
    const onOpen = (): void => {
        setIsOpen(true);
    };
    const onModalClose = (): void => {
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    };

    return {
        isOpen,
        formRef,
        onOpen,
        onModalClose,
    };
};
