import React from 'react';
import { TableCell } from '@mui/material';

export const GroupCell: React.FC = ({ children }) => (
    <TableCell sx={{ border: '1px solid gray', maxWidth: '0px' }} align="center">
        {children}
    </TableCell>
);
