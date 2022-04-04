import React from 'react';
import {
    Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ITeam } from '../../../types/ITeam';

export const Team: React.FC<ITeam> = ({ name, logoUrl, id }) => (
    <Link to={`/teams/${id}`}>
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" height="140" image={logoUrl} />
            <CardContent>
                <Typography variant="h4">
                    {name}
                </Typography>
            </CardContent>
        </Card>
    </Link>
);
