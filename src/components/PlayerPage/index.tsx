import React from 'react';
import { Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../modules';
import { StatBlock } from '../StatBlock';
import { Logo } from '../Logo';
import { EditPlayer } from '../modals/player/EditPlayer';
import { DeletePlayer } from '../modals/player/DeletePlayer';
import { PageContainer } from '../PageContainer';
import { ButtonsContainer } from '../ButtonsContainer';
import { getPlayerById, getTeamById } from '../../store/selectors';
import { ComponentSize } from '../../enums/ComponentSize';
import { Path } from '../../enums/Path';

export const PlayerPage: React.FC = () => {
    const { playerId } = useParams();
    const { data, team } = useSelector((state: ReduxState) => {
        const playerData = getPlayerById(playerId)(state);
        return {
            data: playerData,
            team: getTeamById(playerData?.teamId)(state),
        };
    });

    if (!data) {
        return null;
    }

    const statData = [
        {
            name: 'Team',
            data: (
                team ? (
                    <Link to={`/${Path.Teams}/${team.id}`}>
                        <Logo size={ComponentSize.S} src={team.logoUrl} />
                    </Link>
                ) : '-'),
        },
        { name: 'Position', data: data.position },
        { name: 'Skill', data: `${data.skill}` },
        { name: 'Potential', data: `${data.potential}` },
        { name: 'Mental', data: `${data.mental}` },
        { name: 'Fame', data: `${data.fame}` },
    ];

    return (
        <PageContainer>
            <Typography variant="h1">{data.name}</Typography>
            <StatBlock data={statData} />
            <ButtonsContainer>
                <EditPlayer id={data.id} />
                <DeletePlayer id={data.id} />
            </ButtonsContainer>
        </PageContainer>
    );
};
