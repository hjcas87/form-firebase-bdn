import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { activeRelease, startDeleteRelease } from '../../actions/releases';
import { setMenu } from '../../actions/ui';
import { data } from '../../data/menuAlbum';
import { menuSimple } from '../../data/menuSimple';

export const ReleaseCard = (release) => {
    const { info_basica, id, type, finalized } = release;
    const { setVisibleTab } = useSelector((state) => state.ui);
    const { artista_principal, titulo_album, fecha_lanzamiento, photoUrl } =
        info_basica;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(await startDeleteRelease(release));
    };

    const handleActiveRelease = () => {
        dispatch(activeRelease(id, release));
        localStorage.setItem('activeRelease', JSON.stringify(release));
        if (type === 'album') {
            dispatch(setMenu(data));
            navigate('/album');
        } else {
            dispatch(setMenu(menuSimple));
            navigate('/simple');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-xl md:p-5 p-3 mb-8 w-full">
            <div className="flex md:flex-row flex-col">
                <div
                    className="md:w-52 md:mb-0 mb-5 w-full h-52 overflow-hidden flex justify-center items-center"
                    style={
                        photoUrl && {
                            backgroundImage: `url(${photoUrl})`,
                            backgroundSize: 'cover',
                        }
                    }
                >
                    {!photoUrl && (
                        <div className="w-52">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                fill="#c5c6c7"
                            >
                                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM80.72 256H79.63c-9.078 0-16.4-8.011-15.56-17.34C72.36 146 146.5 72.06 239.3 64.06C248.3 63.28 256 70.75 256 80.09c0 8.35-6.215 15.28-14.27 15.99C164.7 102.9 103.1 164.3 96.15 241.4C95.4 249.6 88.77 256 80.72 256zM256 351.1c-53.02 0-96-43-96-95.1s42.98-96 96-96s96 43 96 96S309 351.1 256 351.1zM256 224C238.3 224 224 238.2 224 256s14.3 32 32 32c17.7 0 32-14.25 32-32S273.7 224 256 224z" />
                            </svg>
                        </div>
                    )}
                </div>
                <div className="mt-1 md:ml-2">
                    <h2 className="text-3xl text-left mb-5">
                        {titulo_album !== ''
                            ? titulo_album
                            : 'Aún no has completado esta información'}
                    </h2>
                    <p className="my-2">
                        Nombre banda/artista:{' '}
                        <span className="font-bold">
                            {artista_principal !== ''
                                ? artista_principal
                                : 'Aún no has completado esta información'}
                        </span>
                    </p>
                    <p className="my-2">
                        Fecha de lanzamiento:{' '}
                        <span className="font-bold">
                            {fecha_lanzamiento !== ''
                                ? fecha_lanzamiento
                                : 'Aún no has completado esta información'}
                        </span>
                    </p>
                    <p className="my-2">
                        Tipo de lanzamiento:{' '}
                        <span className="font-bold">
                            {type === 'album' ? 'Álbum' : 'Simple'}
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex mt-5">
                <button
                    onClick={handleActiveRelease}
                    className="bg-[#45a29e] hover:bg-[#3d918d] shadow-xl text-white font-normal py-2 px-4 rounded-lg w-full mr-2"
                >
                    {finalized ? 'Ver resumen' : 'Continuar'}
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-[#f26659] shadow-lg  hover:bg-[#f78479] text-white font-normal py-2 px-4 rounded-lg w-full ml-2"
                    disabled={finalized}
                >
                    Eliminar
                </button>
            </div>
            <button
                onClick={() => setVisibleTab('resume')}
                className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-4 w-full mx-auto"
                disabled={artista_principal === ''}
            >
                Ver Resumen
            </button>
        </div>
    );
};
