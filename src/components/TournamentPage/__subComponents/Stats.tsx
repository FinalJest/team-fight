import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ITournament } from '../../../types/ITournament';
import { ReduxState } from '../../../modules';
import { getPlayerById, getTeamById } from '../../../store/selectors';
import { Path } from '../../../enums/Path';
import { Logo } from '../../Logo';
import { ComponentSize } from '../../../enums/ComponentSize';
import { StatBlock } from '../../StatBlock';

interface StatsProps {
    data: ITournament;
}

export const Stats: React.FC<StatsProps> = ({ data }) => {
    const { mvp, winner } = useSelector((state: ReduxState) => ({
        winner: getTeamById(data.winnerId)(state),
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
            data: (
                <Link to={`/${Path.Teams}/${winner.id}`}>
                    <Logo size={ComponentSize.S} src={winner.logoUrl} />
                </Link>
            ),
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
