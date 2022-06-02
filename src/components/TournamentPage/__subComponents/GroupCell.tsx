import React from 'react';
import { TableCell } from '@mui/material';

interface GroupCellProps {
    isBold?: boolean;
    backgroundColor?: string;
}

export const GroupCell: React.FC<GroupCellProps> = ({ children, isBold, backgroundColor }) => (
    <TableCell
        sx={{
            border: '1px solid gray',
            maxWidth: '0px',
            fontWeight: `${isBold ? 'bold' : 'auto'}`,
            backgroundColor,
        }}
        align="center"
    >
        {children}
    </TableCell>
);
