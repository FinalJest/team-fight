import React from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../modules';
import { StatBlock } from '../StatBlock';
import { Logo } from '../Logo';
import { EditPlayerModal } from './__subComponents/EditPlayerModal';
import { DeletePlayerModal } from '../Modals/DeletePlayerModal';
import { PageContainer } from '../PageContainer';
import { ButtonsContainer } from '../ButtonsContainer';
import { getPlayerById, getTeamById } from '../../store/selectors';
import { ComponentSize } from '../../enums/ComponentSize';

export const PlayerPage: React.FC = () => {
    const { playerId } = useParams();
    const { data, teamLogoUrl } = useSelector((state: ReduxState) => {
        const playerData = getPlayerById(playerId)(state);
        const teamLogo = getTeamById(playerData?.teamId)(state)?.logoUrl;
        return {
            data: playerData,
            teamLogoUrl: teamLogo,
        };
    });

    if (!data) {
        return null;
    }

    const statData = [
        { name: 'Team', data: <Logo size={ComponentSize.S} src={teamLogoUrl} /> },
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
                <EditPlayerModal {...data} />
                <DeletePlayerModal id={data.id} />
            </ButtonsContainer>
        </PageContainer>
    );
};
