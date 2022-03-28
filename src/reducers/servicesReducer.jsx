import { types } from '../types/types';

const initialState = {
    artistId: [],
};

export const servicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.filterSpotifyArtists:
            return {
                ...state,
                artistId: action.payload,
            };

        default:
            return state;
    }
};
