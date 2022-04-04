import { nanoid } from 'nanoid';
import { IPlayer } from '../types/IPlayer';
import { Position } from '../enums/Position';
import { IRoster } from '../types/IRoster';

const NUMBER_TO_POSITION = [Position.Top, Position.Jungle, Position.Mid, Position.Carry, Position.Support];

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const getRandomPosition = (): Position => {
    const positionNumber = getRandomInt(5);
    const position = NUMBER_TO_POSITION[positionNumber];
    if (!position) {
        throw new Error('Failed to get random position');
    }
    return position;
};

const getSkill = (): number => getRandomInt(100) + 1;
const getPotential = (): number => getRandomInt(10) + 1;
const getMental = (): number => getRandomInt(10) + 1;

const getNewSkillStat = (isRookie: boolean): number => {
    const skills = [getSkill(), getSkill()];

    return isRookie ? Math.min(...skills) : Math.max(...skills);
};
const getNewPotentialStat = (isRookie: boolean): number => {
    const potentials = [getPotential(), getPotential()];

    return isRookie ? Math.max(...potentials) : Math.min(...potentials);
};

const getNewStats = (isRookie: boolean): Pick<IPlayer, 'skill' | 'potential' | 'mental'> => ({
    skill: getNewSkillStat(isRookie),
    potential: getNewPotentialStat(isRookie),
    mental: getMental(),
});

const getNameRandomUserMe = async (): Promise<string> =>
    fetch('https://randomuser.me/api/')
        .then((response) => response.json())
        .then(({ results }) => (Math.random() > 0.5
            ? results[0].login.username
            : results[0].login.password + results[0].name.last));

const getNameDryCodes = async (): Promise<string> =>
    fetch('https://namey.muffinlabs.com/name.json?count=2')
        .then((response) => response.json())
        .then((data) => data[0] + data[1]);

const getName = async (): Promise<string> =>
    (Math.random() > 0.33 ? getNameRandomUserMe() : getNameDryCodes());

export const generatePlayer = async (
    isRookie: boolean = false,
    teamId?: string,
    position?: Position,
): Promise<IPlayer> => ({
    id: nanoid(),
    name: await getName(),
    position: position ?? getRandomPosition(),
    fame: 0,
    teamId,
    ...getNewStats(isRookie),
});

export const generateRoster = async (teamId: string, areRookies: boolean = false): Promise<Partial<IRoster>> => {
    const [top, jungle, mid, carry, support] = await Promise.allSettled([
        generatePlayer(areRookies, teamId, Position.Top),
        generatePlayer(areRookies, teamId, Position.Jungle),
        generatePlayer(areRookies, teamId, Position.Mid),
        generatePlayer(areRookies, teamId, Position.Carry),
        generatePlayer(areRookies, teamId, Position.Support),
    ]).then((results) => results.map((result) => (result.status === 'fulfilled' ? result.value : undefined)));
    return {
        top,
        jungle,
        mid,
        carry,
        support,
    };
};
