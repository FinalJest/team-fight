enum Fame {
    None = 0,
    Small = 1,
    Mid = 2,
    Big = 4,
}

enum Color {
    Gold = '#ffffc8',
    Silver = '#c3c3c3',
    Bronze = '#e5a7a7',
}

export const getFameFromPlacement = (placement: number, isMvp: boolean = false): number => {
    let baseFame: number;
    switch (placement) {
        case 1:
            baseFame = Fame.Big;
            break;
        case 2:
            baseFame = Fame.Mid;
            break;
        case 3:
            baseFame = Fame.Small;
            break;
        default:
            baseFame = Fame.None;
    }
    return Math.floor(baseFame * (isMvp ? 1.5 : 1));
};

export const getColorFromPlace = (place: number): Color | undefined => {
    switch (place) {
        case 1:
            return Color.Gold;
        case 2:
            return Color.Silver;
        case 3:
            return Color.Bronze;
        default:
            return undefined;
    }
};
