import {
    GroupResult, GroupResults, GroupsComposition, GroupTeamResult,
} from '../types/IGroup';
import { IPlacement } from '../types/IPlacement';
import { ITeam } from '../types/ITeam';
import { isStronger } from './comparisonService';

const LETTERS_IN_ALPHABET = 26;

const getPointsFromGame = (game: GroupResult): number => {
    if (!game) {
        return 0;
    }

    if (game[0] > game[1]) {
        return 3;
    }

    if (game[0] === game[1]) {
        return 1;
    }

    return 0;
};

const getGroupLetter = (index: number): string => String.fromCharCode(65 + index);

export const generateGroups = (teamCount: number, groupsCount: number): GroupsComposition => {
    if (teamCount < groupsCount) {
        return generateGroups(teamCount, teamCount);
    }
    const composition: GroupsComposition = {};
    for (let i = 1; i <= groupsCount; i++) {
        let currentIndex = '';
        let currentNumber = i;
        while (currentNumber > 0) {
            // For the purposes of calculation it has to go from 0, for the purposes of cycle - from 1
            const adjustedNumber = currentNumber - 1;
            currentIndex = `${getGroupLetter(adjustedNumber % LETTERS_IN_ALPHABET)}${currentIndex}`;
            currentNumber = Math.floor(adjustedNumber / LETTERS_IN_ALPHABET);
        }
        const teamsInGroup = Math.floor((teamCount - i) / groupsCount) + 1;
        composition[currentIndex] = Array(teamsInGroup).fill(undefined);
    }
    return composition;
};

export const getWins = (groupResults: GroupTeamResult): number =>
    Object.values(groupResults).reduce((wins, result) => (result ? wins + result[0] : wins), 0);

export const getLoses = (groupResults: GroupTeamResult): number =>
    Object.values(groupResults).reduce((loses, result) => (result ? loses + result[1] : loses), 0);

export const getPoints = (groupResults: GroupTeamResult): number =>
    Object.values(groupResults).reduce((points, result) => points + getPointsFromGame(result), 0);

export const getSortedPlacements = (
    results: GroupResults,
    shouldSortByResults: boolean = true,
): IPlacement[] => Object.entries(results)
    .map(([id, result]) => ({
        id,
        points: getPoints(result),
        wins: getWins(result),
        loses: getLoses(result),
    })).sort((teamA, teamB) => {
        const recordAtoB = results[teamA.id][teamB.id];
        const scoreAtoB = recordAtoB && shouldSortByResults ? recordAtoB[0] - recordAtoB[1] : 0;
        return isStronger(
            [teamA.points, teamA.wins, teamB.loses, scoreAtoB],
            [teamB.points, teamB.wins, teamA.loses, scoreAtoB * -1],
        ) ? 1 : -1;
    });

export const getPlaces = (results: GroupResults): Record<ITeam['id'], number> => {
    const sortedPoints = getSortedPlacements(results, false);

    const places: Record<ITeam['id'], number> = {};
    let placeIndex: number = 0;
    let prevPoints: number | null = null;
    let prevWins: number | null = null;
    let prevLoses: number | null = null;

    sortedPoints.forEach((teamPointsData, index) => {
        if (prevPoints !== teamPointsData.points
            || prevWins !== teamPointsData.wins
            || prevLoses !== teamPointsData.loses
        ) {
            const newIndex = index + 1;
            places[teamPointsData.id] = newIndex;
            placeIndex = newIndex;
        } else {
            places[teamPointsData.id] = placeIndex;
        }
        prevPoints = teamPointsData.points;
        prevWins = teamPointsData.wins;
        prevLoses = teamPointsData.loses;
    });

    return places;
};
