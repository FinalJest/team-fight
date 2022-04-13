import { GroupsComposition } from '../types/IGroup';

const LETTERS_IN_ALPHABET = 26;

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
