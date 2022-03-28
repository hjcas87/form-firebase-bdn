import { types } from '../types/types';

export const startLoading = () => ({
    type: types.uiStartLoading,
});
export const finishLoading = () => ({
    type: types.uiFinishLoading,
});
export const windowSize = (size) => ({
    type: types.uiWindowSize,
    payload: size,
});
export const isMenuOpen = (menu) => ({
    type: types.uiMenu,
    payload: menu,
});
export const inputsForAlbums = (albums) => ({
    type: types.uiInputsForAlbums,
    payload: albums,
});
export const inputsForSongs = (songs) => ({
    type: types.uiInputsForSongs,
    payload: songs,
});
export const newAlbumRelease = (bool) => ({
    type: types.uiNewAlbumRelease,
    payload: bool
});
export const newSimpleRelease = (bool) => ({
    type: types.uiNewSimpleRelease,
    payload: bool
});
export const setTabs = (state) => ({
    type: types.uiSetVisibleTab,
    payload: state
});
export const tabs = (state) => ({
    type: types.uiVisibleTab,
    payload: state
});
export const setFromSong = (state) => ({
    type: types.uiSongVisibleTab,
    payload: state
});
export const setMenu = (data) => ({
    type: types.uiSetVisibleMenu,
    payload: data
});
export const setProgressBar = (data) => ({
    type: types.uiProgressBar,
    payload: data
});

