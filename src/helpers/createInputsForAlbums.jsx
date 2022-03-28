export const createInputsForAlbums = (amount, previousAmount) => {
    let arr = [];
    for (let i = 0; i < amount; i++) {
        if (previousAmount[i]) {
            arr = [...arr, { disco: previousAmount[i].disco }];
        } else {
            arr = [...arr, { disco: '' }];
        }
    }
    return arr;
};
