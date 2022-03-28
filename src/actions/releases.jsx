import firebaseApp from '../firebase/firebaseConfig';
import {
    addDoc,
    getFirestore,
    collection,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    uploadBytesResumable,
} from 'firebase/storage';
import { formAlbumData } from '../data/formAlbumData';
import { formSimpleData } from '../data/formSimpleData';
import { confirmAlert } from '../helpers/confirmAlert';
import { loadReleases } from '../helpers/loadReleases';
import { types } from '../types/types';
import {
    finishLoading,
    isMenuOpen,
    newAlbumRelease,
    newSimpleRelease,
    setMenu,
    setProgressBar,
    startLoading,
    tabs,
} from './ui';
import { data } from '../data/menuAlbum';
import { menuSimple } from '../data/menuSimple';
import { confirmDeleteAlert } from '../helpers/confirmDeleteAlert';
import { fileUpload } from '../helpers/fileUpload';
import Swal from 'sweetalert2';

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const startNewRelease = (typeRelease) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const confirm = await confirmAlert(typeRelease);
        dispatch(startLoading());
        if (confirm) {
            try {
                if (typeRelease === 'album') {
                    const docRef = await addDoc(
                        collection(firestore, `${uid}/releases/album`),
                        formAlbumData
                    );
                    dispatch(setMenu(data));
                    dispatch(activeRelease(docRef.id, formAlbumData));
                    dispatch(newAlbumRelease(true));
                } else {
                    const docRef = await addDoc(
                        collection(firestore, `${uid}/releases/simple`),
                        formSimpleData
                    );
                    dispatch(setMenu(menuSimple));
                    dispatch(activeRelease(docRef.id, formSimpleData));
                    dispatch(newSimpleRelease(true));
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Un nuevo proyecto ha sido creado!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                dispatch(startLoadingReleases(uid));
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } else {
            dispatch(isMenuOpen(false));
        }
        dispatch(finishLoading());
    };
};

export const activeRelease = (id, release) => ({
    type: types.releaseActive,
    payload: {
        id,
        ...release,
    },
});

export const startLoadingReleases = (uid) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const releases = await loadReleases(uid);
        dispatch(setReleases(releases));
        dispatch(finishLoading());
    };
};

export const setReleases = (releases) => ({
    type: types.releaseLoad,
    payload: releases,
});

export const startSaveRelease = (release, song) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { setVisibleTab, visibleTab } = getState().ui;

        const releaseToFirestore = { ...release };
        delete releaseToFirestore.id;
        const updateRelease = doc(
            firestore,
            `${uid}/releases/${release.type}/${release.id}`
        );
        dispatch(startLoading());
        try {
            await updateDoc(updateRelease, releaseToFirestore);
            dispatch(refreshRelease(release.id, releaseToFirestore));
            localStorage.setItem('activeRelease', JSON.stringify(release));
            if (!song) {
                setVisibleTab(visibleTab + 1);
                dispatch(tabs(visibleTab + 1));
            }
            Swal.fire({
                icon: 'success',
                title: 'Los cambios han sido guardados',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error!',
                showConfirmButton: false,
                timer: 1500,
            });
            console.log(error);
        }
        dispatch(finishLoading());
    };
};

export const refreshRelease = (id, release) => ({
    type: types.releaseUpdated,
    payload: {
        id,
        release: {
            id,
            ...release,
        },
    },
});

export const startDeleteRelease = (release) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const confirm = await confirmDeleteAlert();
        if (confirm) {
            dispatch(startLoading());
            try {
                await deleteDoc(
                    doc(
                        firestore,
                        `${uid}/releases/${release.type}/${release.id}`
                    )
                );
                dispatch(deleteReleases(release.id, release));

                Swal.fire({
                    icon: 'success',
                    title: 'El proyecto ha sido eliminado!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                dispatch(startLoadingReleases(uid));
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
        dispatch(finishLoading());
    };
};
export const deleteReleases = (id, release) => ({
    type: types.releaseDeleted,
    payload: {
        id,
        release: {
            id,
            ...release,
        },
    },
});

export const startUploadingCover = (file) => {
    return async (dispatch, getState) => {
        const { active: release } = getState().realeases;
        dispatch(startLoading());
        const fileUrl = await fileUpload(file);
        release.info_basica.photoUrl = fileUrl;
        dispatch(startSaveRelease(release, true));
        // console.log(fileUrl);
    };
};
export const startCoverEditing = () => {
    return (dispatch, getState) => {
        const { active: release } = getState().realeases;
        delete release.info_basica.photoUrl;
        dispatch(startSaveRelease(release, true));
    };
};

export const startUploadingAudio = (file, song) => {
    return async (dispatch, getState) => {
        const { active: release } = getState().realeases;
        const { uid } = getState().auth;
        let data;
        if (release.type === 'album') {
            data = ref(
                storage,
                `${uid}/${release.type}/${release.info_basica.titulo_album}/${song.titulo}`
            );
        } else {
            data = ref(storage, `${uid}/${release.type}/${song.titulo}`);
        }
        const uploadTask = uploadBytesResumable(data, file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                dispatch(
                    setProgressBar({
                        progress,
                        total: snapshot.totalBytes,
                        current: snapshot.bytesTransferred,
                        id: song.id,
                    })
                );
            },
            (error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            () => {
                release.canciones.forEach((vol) => {
                    vol.volumen.forEach((cancion) => {
                        cancion.id === song.id
                            ? (cancion.audio = true)
                            : cancion;
                    });
                });
                dispatch(startSaveRelease(release, true));
                dispatch(setProgressBar(null));
            }
        );
    };
};

export const startAudioEditing = (song) => {
    return async (dispatch, getState) => {
        const { active: release } = getState().realeases;
        const { uid } = getState().auth;
        try {
            dispatch(startLoading());
            if (release.type === 'album') {
                const archivoRef = ref(
                    storage,
                    `${uid}/${release.type}/${release.info_basica.titulo_album}/${song.titulo}`
                );
                deleteObject(archivoRef);
                song.audio = false;
                dispatch(startSaveRelease(release, true));
            } else {
                const archivoRef = ref(
                    storage,
                    `${uid}/${release.type}/${song.titulo}`
                );
                deleteObject(archivoRef);
                song.audio = false;
                dispatch(startSaveRelease(release, true));
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error!',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };
};

export const cleanRelease = () => ({
    type: types.releaseClean,
});
