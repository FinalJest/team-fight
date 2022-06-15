import { ExtendButtonBase } from '@mui/material';
import { OverridableTypeMap } from '@mui/material/OverridableComponent';
import React from 'react';

export interface BaseModalProps {
    ButtonComponent?: ExtendButtonBase<OverridableTypeMap>;
    content?: React.ReactElement;
    onClose?(): void;
}
