import firebaseApp from '../firebase/firebaseConfig';
// import Swal from 'sweetalert2';
import { types } from '../types/types';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { finishLoading, startLoading } from './ui';

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const startLoginWithGoogle = () => {
    return (dispatch) => {
        signInWithPopup(auth, googleProvider)
            .then(({ user }) => {
                // console.log(user);
                dispatch(login(user.uid, user.displayName, user.photoURL));
            })
            .catch((error) => {
                // console.log(error);
            });
    };
};

export const startRegisterWithEmailAndPassword = (email, password, name) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(user, { displayName: name });

                dispatch(login(user.uid, user.displayName));
            })
            .catch((err) => console.log(err));
    };
};
export const startLoginWithEmailAndPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        Swal.showLoading();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                Swal.close();
                dispatch(finishLoading());
            })
            .catch((e) => {
                console.log(e.message);
                Swal.close();
                dispatch(finishLoading());
                // Swal.fire('Error', e.message, 'error')
            });
    };
};

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    },
});

export const startLogout = () => {
    return async (dispatch) => {
        await signOut(auth);
        dispatch(logout());
    };
};
export const logout = () => ({
    type: types.logout,
});
