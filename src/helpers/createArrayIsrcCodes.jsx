export const createArrayIsrcCodes = (canciones, prevArr) => {
    let arr = [];
    canciones.forEach((element) =>
        element.volumen.map((e, i) => {
            arr = [...arr, { [e.titulo]: '' }];
        })
    );
    // console.log(arr);
    prevArr.forEach((cancion) => {
        arr.forEach((e) => {
            if (Object.keys(cancion).some((ipt) => ipt === Object.keys(e)[0])) {
                e[Object.keys(e)[0]] = Object.values(cancion)[0];
            }
        });
    });
    return arr;
};
