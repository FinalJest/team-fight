import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ITournament } from '../../../types/ITournament';
import { ReduxState } from '../../../modules';
import { getPlayerById, getTeamById } from '../../../store/selectors';
import { Path } from '../../../enums/Path';
import { TeamLogo } from '../../TeamLogo';
import { StatBlock } from '../../StatBlock';

interface StatsProps {
    data: ITournament;
}

export const Stats: React.FC<StatsProps> = ({ data }) => {
    const { mvp, winner } = useSelector((state: ReduxState) => ({
        winner: getTeamById(data.placements && data.placements[0])(state),
        mvp: getPlayerById(data.mvpId)(state),
    }));

    if (!winner) {
        return null;
    }

    const statData = [
        {
            name: 'Team Count',
            data: `${data.teamCount}`,
        },
        {
            name: 'Winner',
            data: <TeamLogo src={winner.logoUrl} id={winner.id} />,
        },
        {
            name: 'MVP',
            data: mvp ? (
                <Link to={`/${Path.Players}/${mvp.id}`}>
                    {mvp.name}
                </Link>
            ) : '-',
        },
    ];
    return <StatBlock data={statData} />;
};
