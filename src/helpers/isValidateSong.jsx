import { shootError } from './shootError';

export const isValidateSong = (song) => {
    if (song.lenguaje_explicito.trim().length === 0) {
        return shootError(
            'Por favor dinos si esta canción contiene lenguaje explícito'
        );
    } else if (
        song.artistas_destacados.length !== 0 &&
        song.artistas_destacados.some(
            (artist) => artist.rol.trim().length === 0
        )
    ) {
        return shootError('Por favor dinos el rol de los artistas destacados');
    } else if (
        song.artistas_destacados.length !== 0 &&
        song.artistas_destacados.some(
            (artist) => artist.artista_destacado.trim().length === 0
        )
    ) {
        return shootError(
            'Por favor dinos los nombres de los artistas destacados'
        );
    } else if (song.idioma.trim().length === 0) {
        return shootError(
            'Por favor dinos en que idioma se canta esta canción o si es una canción instrumental'
        );
    } else if (
        song.idioma.trim() === 'Otro' &&
        song.otro_idioma.trim().length === 0
    ) {
        return shootError(
            'Por favor dinos en que idioma se canta esta canción o si es una canción instrumental'
        );
    } else if (song.version.trim().length === 0) {
        return shootError('Por favor dinos si esta versión es en vivo o no');
    } else if (song.composicion.trim().length === 0) {
        return shootError('Por favor dinos que tipo de composición es esta');
    } else if (song.compositores.length === 0) {
        return shootError(
            'Deberias agregar al menos un compositor para esta canción'
        );
    } else if (
        song.compositores.some(
            (composer) => composer.compositor.trim().length === 0
        )
    ) {
        return shootError('Dinos el nombre del compositor');
    } else if (
        song.compositores.some(
            (composer) => composer[`rol_autor_${composer.counter}`].trim().length === 0
        )
    ) {
        return shootError('Completá todos los campos');
    } else {
        return true;
    }
};
