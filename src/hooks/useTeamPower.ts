import { useSelector } from 'react-redux';
import { getPlayersByTeamId } from '../store/selectors';
import { ReduxState } from '../modules';
import { getPlayersPower } from '../services/fightSimulator';

export const useTeamPower = (id?: string): number => {
    const players = useSelector(getPlayersByTeamId(id));
    return getPlayersPower(players);
};

export const useTeamsPowers = (ids: Array<string | undefined>): number[] => {
    const teamsOfPlayers = useSelector((state: ReduxState) => ids.map((id) => getPlayersByTeamId(id)(state)));
    return teamsOfPlayers.map(getPlayersPower);
};
