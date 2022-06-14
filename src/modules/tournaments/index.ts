import { ActionType } from 'typesafe-actions';

import { nanoid } from 'nanoid';
import * as actions from './actions';
import * as types from './actionTypes';
import { TournamentsState } from '../../types/TournamentsState';
import { ITournament } from '../../types/ITournament';
import { generateGroups } from '../../services/groupService';
import { generatePlayoff } from '../../services/playoffService';
import { NodePart } from '../../types/IPlayoff';

const getEmptyTournament = (
    name: string,
    teamCount: number,
    groupsCount: number,
    playoffTeamCount: number,
    isForFame: boolean = true,
): ITournament => ({
    id: nanoid(),
    teamCount,
    name,
    isFinished: false,
    isForFame,
    group: groupsCount
        ? {
            results: {},
            composition: generateGroups(teamCount, groupsCount),
        }
        : undefined,
    playoff: playoffTeamCount
        ? generatePlayoff(playoffTeamCount)
        : undefined,
});

export const initialTournamentState = [];

export const tournaments = (
    state: TournamentsState = initialTournamentState,
    action: ActionType<typeof actions>,
): TournamentsState => {
    switch (action.type) {
        case types.ADD_TOURNAMENT:
            return [...state, getEmptyTournament(
                action.payload.name,
                action.payload.teamCount,
                action.payload.groupsCount,
                action.payload.playoffTeamCount,
                action.payload.isForFame,
            )];
        case types.ADD_TEAM_TO_TOURNAMENT_GROUP:
            return state.map((tournament) => {
                if (tournament.id !== action.payload.tournamentId || !tournament.group) {
                    return tournament;
                }
                const newComposition = { ...tournament.group.composition };
                const newGroup = [...newComposition[action.payload.groupName]];
                newGroup[action.payload.indexInGroup] = action.payload.teamId;
                newComposition[action.payload.groupName] = newGroup;
                return { ...tournament, group: { ...tournament.group, composition: newComposition } };
            });
        case types.ADD_TEAM_TO_PLAYOFF_NODE:
            return state.map((tournament) => {
                const {
                    part, tournamentId, teamId, nodeId,
                } = action.payload;
                if (tournament.id !== tournamentId || !tournament.playoff) {
                    return tournament;
                }
                const oldNode = tournament.playoff.data[nodeId];

                if (!oldNode) {
                    return tournament;
                }

                const [partToChange, partToStay] = [part, Math.abs(part - 1)];
                const oldParts = oldNode.parts;
                const newParts: [NodePart, NodePart] = [
                    {
                        ...oldParts[partToChange],
                        teamId: teamId ?? null,
                        score: 0,
                    },
                    {
                        ...oldParts[partToStay],
                        score: 0,
                    },
                ];

                const newData = {
                    ...tournament.playoff.data,
                    [nodeId]: {
                        ...oldNode,
                        winner: null,
                        parts: newParts,
                    },
                };

                return { ...tournament, playoff: { ...tournament.playoff, data: newData } };
            });
        case types.ADD_RESULT_TO_GROUP:
            return state.map((tournament) => {
                if (tournament.id !== action.payload.tournamentId || !tournament.group) {
                    return tournament;
                }

                const newGroup = { ...tournament.group };
                const team1results = newGroup.results[action.payload.team1] ?? {};
                team1results[action.payload.team2] = action.payload.score;
                const team2results = newGroup.results[action.payload.team2] ?? {};
                team2results[action.payload.team1] = action.payload.score
                    && [action.payload.score[1], action.payload.score[0]];
                newGroup.results = {
                    ...newGroup.results,
                    [action.payload.team1]: team1results,
                    [action.payload.team2]: team2results,
                };
                return {
                    ...tournament,
                    group: newGroup,
                };
            });
        case types.ADD_RESULT_TO_PLAYOFF:
            return state.map((tournament) => {
                if (tournament.id !== action.payload.tournamentId || !tournament.playoff) {
                    return tournament;
                }

                const { nodeId, score } = action.payload;
                const playoffData = tournament.playoff.data;
                const node = playoffData[nodeId];

                if (!node) {
                    return tournament;
                }

                const team1Diff = score[0] - score[1];
                let winner = null;

                if (team1Diff) {
                    winner = team1Diff > 0 ? node.parts[0]?.teamId : node.parts[1]?.teamId;
                }

                const nextNode = Object.values(playoffData).find((potentialNode) =>
                    potentialNode.parts[0]?.prevNode === nodeId
                    || potentialNode.parts[1]?.prevNode === nodeId);
                const newCurrentParts: [NodePart, NodePart] = [
                    { ...node.parts[0], score: score[0] }, { ...node.parts[1], score: score[1] },
                ];
                const newCurrentNode = {
                    ...node,
                    winner,
                    parts: newCurrentParts,
                };
                const newNextParts: [NodePart, NodePart] | null = nextNode
                    ? [
                        nextNode.parts[0].prevNode === nodeId
                            ? { ...nextNode.parts[0], teamId: winner } : nextNode.parts[0],
                        nextNode.parts[1].prevNode === nodeId
                            ? { ...nextNode.parts[1], teamId: winner } : nextNode.parts[1],
                    ]
                    : null;
                const newNextNode = nextNode && newNextParts
                    ? {
                        [nextNode.id]: {
                            ...nextNode,
                            parts: newNextParts,
                        },
                    }
                    : {};

                const newData = {
                    ...playoffData,
                    [action.payload.nodeId]: newCurrentNode,
                    ...newNextNode,
                };

                return { ...tournament, playoff: { ...tournament.playoff, data: newData } };
            });
        case types.RECORD_TOURNAMENT_END:
            return state.map((tournament) => {
                if (tournament.id !== action.payload.tournamentId) {
                    return tournament;
                }

                return {
                    ...tournament,
                    isFinished: true,
                    placements: action.payload.placements,
                    mvpId: action.payload.mvpId,
                };
            });
        default:
            return state;
    }
};
