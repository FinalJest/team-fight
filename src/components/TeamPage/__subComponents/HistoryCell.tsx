import React from 'react';
import { TableCell } from '@mui/material';

interface HistoryCellProps {
    backgroundColor?: string;
    isBold?: boolean;
}

export const HistoryCell: React.FC<HistoryCellProps> = ({
    children,
    backgroundColor,
    isBold,
}) => (
    <TableCell
        sx={{
            border: '1px solid gray',
            backgroundColor,
            fontWeight: isBold ? 'bold' : 'auto',
        }}
        align="center"
    >
        {children}
    </TableCell>
);
