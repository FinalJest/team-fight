export const isStronger = (currentMax: number[], contender: number[]): boolean => {
    for (let i = 0; i < contender.length; i++) {
        if (currentMax[i] === undefined) {
            return true;
        }
        if (contender[i] > currentMax[i]) {
            return true;
        }
        if (contender[i] === currentMax[i]) {
            if (i === contender.length - 1) {
                return Math.random() > 0.5;
            }
        } else {
            return false;
        }
    }
    return false;
};
