import React from 'react';
import {
    Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ITeam } from '../../../types/ITeam';
import { Path } from '../../../enums/Path';
import { ReduxState } from '../../../modules';
import { getTeamPower } from '../../../store/selectors';

export const Team: React.FC<ITeam> = ({ name, logoUrl, id }) => {
    const skill = useSelector((state: ReduxState) => getTeamPower(state, id));
    return (
        <Link to={`/${Path.Teams}/${id}`}>
            <Card sx={{ width: 160 }}>
                <CardMedia component="img" height="140" image={logoUrl} />
                <CardContent>
                    <Typography noWrap variant="h4">
                        {name}
                    </Typography>
                    <Typography noWrap variant="body1">
                        {skill}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};
