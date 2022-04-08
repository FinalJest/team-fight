import { ExtendButtonBase } from '@mui/material';
import { OverridableTypeMap } from '@mui/material/OverridableComponent';

export interface BaseModalProps {
    ButtonComponent?: ExtendButtonBase<OverridableTypeMap>;
    onClose?(): void;
}
