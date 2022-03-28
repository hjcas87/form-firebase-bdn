import { collection, getDocs, getFirestore } from 'firebase/firestore';
import firebaseApp from '../firebase/firebaseConfig';

const firestore = getFirestore(firebaseApp);

export const loadReleases = (uid) => {
    const releaseAlbumSnap = getDocs(
        collection(firestore, `${uid}/releases/album`)
    );
    const releaseSimpleSnap = getDocs(
        collection(firestore, `${uid}/releases/simple`)
    );
    let releases = [];
    return Promise.all([releaseAlbumSnap, releaseSimpleSnap]).then((values) => {
        values.forEach((val) => {
            val.forEach((snap) => {
                releases.push({
                    id: snap.id,
                    ...snap.data(),
                });
            });
        });
        return releases
    });
};
