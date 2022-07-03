import React from 'react';
import { Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IPlayer } from '../../../types/IPlayer';
import { ITeam } from '../../../types/ITeam';
import { TeamLogo } from '../../TeamLogo';
import { ComponentSize } from '../../../enums/ComponentSize';
import { PlayersTable } from '../../PlayersTable';
import { FreeMarketPlayersTable } from './FreeMarketPlayersTable';
import { IRoster } from '../../../types/IRoster';
import { getTeamsThatDidTransfer } from '../../../store/selectors';

interface ContainerProps {
    hasAlreadyTransferred: boolean;
}

const Container = styled.div<ContainerProps>`
    opacity: ${({ hasAlreadyTransferred }) => (hasAlreadyTransferred ? 0.3 : 1)};
    padding: 8px 4px;
`;

interface TeamBlockProps {
    team: ITeam;
    potentialPlayers: IPlayer[];
    roster?: IRoster;
}

export const TeamBlock: React.FC<TeamBlockProps> = ({ team, potentialPlayers, roster }) => {
    const [isHidden, setIsHidden] = React.useState(true);
    const teamsThatDidTransfer = useSelector(getTeamsThatDidTransfer);
    if (!potentialPlayers.length) {
        return null;
    }
    const handleHideToggle = () => {
        setIsHidden(!isHidden);
    };

    return (
        <Container key={team.id} hasAlreadyTransferred={teamsThatDidTransfer.includes(team.id)}>
            <TeamLogo size={ComponentSize.M} id={team.id} />
            <Typography variant="h3">
                {team.name}
            </Typography>
            <Button onClick={handleHideToggle}>{isHidden ? '...' : 'Hide'}</Button>
            {!isHidden && (
                <>
                    {roster && (
                        <>
                            <Typography variant="h4">
                                Roster
                            </Typography>
                            <PlayersTable
                                rowsData={Object.values(roster)
                                    .filter(Boolean)
                                    .map((player) => ({ data: player }))}
                            />
                        </>
                    )}
                    <Typography variant="h4">
                        Players of Interest
                    </Typography>
                    <FreeMarketPlayersTable
                        teamId={team.id}
                        players={potentialPlayers}
                        currentRoster={roster ?? {}}
                    />
                </>
            )}
        </Container>
    );
};
