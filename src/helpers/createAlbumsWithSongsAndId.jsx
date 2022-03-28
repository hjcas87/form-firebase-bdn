export const createAlbumsWithSongsAndId = (data, prevData) => {
    return data.map((album, i) => ({
        volumen: album.volumen.map((element, x) => {
            if (
                prevData[i] &&
                prevData[i].volumen[x] &&
                prevData[i].volumen[x].titulo === element.cancion
            ) {
                return prevData[i].volumen[x];
            } else {
                return {
                    titulo: element.cancion,
                    id: `abm-${i + 1}-sng-${x + 1}`,
                    artistas_destacados: [],
                    composicion: '',
                    compositores: [],
                    idioma: '',
                    lenguaje_explicito: '',
                    otro_idioma: '',
                    version: '',
                    audio: false
                };
            }
        }),
    }));
};
