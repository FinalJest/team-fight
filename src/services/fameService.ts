enum Fame {
    None = 0,
    Small = 1,
    Mid = 2,
    Big = 4,
}

export const getFameFromPlacement = (placement: number): Fame => {
    switch (placement) {
        case 0:
            return Fame.Big;
        case 1:
            return Fame.Mid;
        case 2:
            return Fame.Small;
        default:
            return Fame.None;
    }
};
