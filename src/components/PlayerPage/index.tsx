import React from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../modules';
import { StatBlock } from '../StatBlock';
import { TeamLogo } from '../TeamLogo';
import { EditPlayer } from '../modals/player/EditPlayer';
import { DeletePlayer } from '../modals/player/DeletePlayer';
import { PageContainer } from '../PageContainer';
import { ButtonsContainer } from '../ButtonsContainer';
import { getPlayerById, getTeamById } from '../../store/selectors';
import { RetirePlayer } from '../modals/player/RetirePlayer';
import { PlayerHistory } from './__subComponents/PlayerHistory';

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
            data: team ? <TeamLogo src={team.logoUrl} id={data.id} /> : '-',
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
            {Boolean(data.history.length) && <PlayerHistory data={data.history} />}
            <ButtonsContainer>
                {!data.isRetired && (
                    <>
                        <EditPlayer id={data.id} />
                        <RetirePlayer id={data.id} />
                    </>
                )}
                <DeletePlayer id={data.id} />
            </ButtonsContainer>
        </PageContainer>
    );
};
