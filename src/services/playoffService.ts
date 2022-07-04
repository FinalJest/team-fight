import { nanoid } from 'nanoid';
import { IPlayoff, PlayoffNode } from '../types/IPlayoff';
import { ITeam } from '../types/ITeam';

const getEmptyNode = (): PlayoffNode => ({
    id: nanoid(),
    winner: null,
    parts: [
        {
            teamId: null,
            score: 0,
        },
        {
            teamId: null,
            score: 0,
        },
    ],
});

// TODO: FIX PLAYOFF GENERATION WITH <3 TEAMS
export const generatePlayoff = (teamCount: number): IPlayoff => {
    const coreNode = getEmptyNode();
    const levels: PlayoffNode[][] = [[coreNode]];
    let currentPower = 0;

    do {
        currentPower++;
        for (let i = 0; i < Math.min(2 ** currentPower, teamCount / 2); i++) {
            if (levels[currentPower]) {
                levels[currentPower].push(getEmptyNode());
            } else {
                levels[currentPower] = [getEmptyNode()];
            }
        }
    } while ((2 ** (currentPower + 1) < teamCount));

    for (let i = 0; i < levels.length - 1; i++) {
        const level = levels[i];
        for (let nodeIndex = 0; nodeIndex < level.length; nodeIndex++) {
            const node = level[nodeIndex];
            node.parts[0].prevNode = levels[i + 1][nodeIndex * 2]?.id;
            node.parts[1].prevNode = levels[i + 1][nodeIndex * 2 + 1]?.id;
        }
    }

    return {
        data: levels.reduce<IPlayoff['data']>((result, level) => ({
            ...result,
            ...level.reduce((levelResult, node) => ({ ...levelResult, [node.id]: node }), {}),
        }), {}),
        composition: levels.map((level) => level.map((node) => node.id)),
    };
};

export const getPlayoffPlacements = (playoff: IPlayoff): ITeam['id'][] => {
    const result: ITeam['id'][] = [];
    const { composition, data } = playoff;
    composition.forEach((level, index) => {
        const levelResults: { id: ITeam['id'], score: number }[] = [];
        if (index === 0 && level.length === 1) {
            const { winner } = data[level[0]];
            if (winner) {
                result.push(winner);
            }
        }
        level.forEach((node) => {
            const nodeData = data[node];
            const loser = nodeData.parts.find((part) => part.teamId !== nodeData.winner);
            if (loser && loser.teamId) {
                levelResults.push({ id: loser.teamId, score: loser.score });
            }
        });
        result.push(...levelResults
            .sort((teamA, teamB) => teamB.score - teamA.score)
            .map((team) => team.id));
    });

    return result;
};

export const getPlayoffTeamsCount = (playoff?: IPlayoff): number => {
    if (!playoff || !playoff.composition.length) {
        return 0;
    }

    return playoff.composition[playoff.composition.length - 1].length * 2;
};
