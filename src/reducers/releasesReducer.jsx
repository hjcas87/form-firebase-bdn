import { types } from '../types/types';

const initialState = {
    releases: [],
    active: null,
};

export const releasesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.releaseActive:
            return {
                ...state,
                active: {
                    ...action.payload,
                },
            };
        case types.releaseLoad:
            return {
                ...state,
                releases: [...action.payload],
            };
        case types.releaseUpdated:
            return {
                ...state,
                releases: state.releases.map((release) =>
                    release.id === action.payload.id
                        ? action.payload.release
                        : release
                ),
            };
        case types.releaseDeleted:
            return {
                ...state,
                releases: state.releases.filter(
                    (release) => release.id !== action.payload.id
                ),
            };
        case types.releaseClean:
            return {
                ...state,
                active: null,
            };

        default:
            return state;
    }
};
