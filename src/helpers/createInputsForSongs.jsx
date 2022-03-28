export const createInputsForSongs = (arrSongs, prevArrSongs) => {
    return arrSongs.map((element, i) => {
        let arr = { volumen: [] };
        for (let x = 0; x < element.disco; x++) {
            if (prevArrSongs[i] && prevArrSongs[i].volumen[x]) {
                arr.volumen = [
                    ...arr.volumen,
                    { cancion: prevArrSongs[i].volumen[x].cancion },
                ];
            } else {
                arr.volumen = [...arr.volumen, { cancion: '' }];
            }
        }
        return arr;
    });
};
