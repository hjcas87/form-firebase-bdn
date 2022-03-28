import { filterArtists } from '../helpers/filterArtists';
import { getArtists } from '../services/getArtists';
import { types } from '../types/types';

export const getArtistForSpotify = (artist, artistsProfiles, id) => {
    let data = {};
    return (dispatch) => {
        getArtists(artist.name)
            .then((datos) => {
                data = {
                    datos,
                    id: artist.id,
                };
                const artists = filterArtists(data, artistsProfiles, id);
                dispatch(filterSpotifyArtists(artists));
            })
            .catch((err) => {
                console.log(err);
                data = {
                    datos: [],
                    id: artist.id,
                };
                const artists = filterArtists(data, artistsProfiles, id);
                dispatch(filterSpotifyArtists(artists));
            });
    };
};

export const filterSpotifyArtists = (data) => {
    return {
        type: types.filterSpotifyArtists,
        payload: data,
    };
};
