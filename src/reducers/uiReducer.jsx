import { types } from '../types/types';

const initialState = {
    loading: false,
    isPhoneScreen: false,
    isOpen: false,
    inputsAlbums: [],
    inputsSongs: [],
    albumRelease: false,
    simpleRelease: false,
    setVisibleTab: '',
    visibleTab: '',
    songTab: false,
    data: [],
    progress: null
};

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiStartLoading:
            return {
                ...state,
                loading: true,
            };
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false,
            };
        case types.uiWindowSize:
            return {
                ...state,
                isPhoneScreen: action.payload,
            };
        case types.uiMenu:
            return {
                ...state,
                isOpen: action.payload,
            };
        case types.uiInputsForAlbums:
            return {
                ...state,
                inputsAlbums: action.payload,
            };
        case types.uiInputsForSongs:
            return {
                ...state,
                inputsSongs: action.payload,
            };
        case types.uiNewAlbumRelease:
            return {
                ...state,
                albumRelease: action.payload,
            };
        case types.uiNewSimpleRelease:
            return {
                ...state,
                simpleRelease: action.payload,
            };
        case types.uiVisibleTab:
            return {
                ...state,
                visibleTab: action.payload,
            };
        case types.uiSetVisibleTab:
            return {
                ...state,
                setVisibleTab: action.payload,
            };
        case types.uiSongVisibleTab:
            return {
                ...state,
                songTab: action.payload,
            };
        case types.uiSetVisibleMenu:
            return {
                ...state,
                data: action.payload,
            };
        case types.uiProgressBar:
            return {
                ...state,
                progress: action.payload,
            };

        default:
            return state;
    }
};
