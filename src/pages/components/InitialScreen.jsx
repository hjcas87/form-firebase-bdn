import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startNewRelease } from '../../actions/releases';
import { newAlbumRelease, newSimpleRelease } from '../../actions/ui';
import { formSimpleData } from '../../data/formSimpleData';

export const InitialScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { albumRelease, simpleRelease } = useSelector((state) => state.ui);
    const handleClick = (e) => {
        // console.log(formSimpleData)
        if (e.target.id === 'album') {
            dispatch(startNewRelease('album'));
        } else {
            dispatch(startNewRelease('simple'));
        }
    };

    useEffect(() => {
        if (albumRelease) {
            navigate('/album');
            dispatch(newAlbumRelease(false));
        } else if (simpleRelease) {
            navigate('/simple');
            dispatch(newSimpleRelease(false));
        }
    }, [albumRelease, simpleRelease]);
    return (
        <div className="text-center w-4/5 md:w-full">
            <h2 className="text-white text-2xl font-light">
                Aún no hay proyectos para mostrar, empezá creando uno
            </h2>
            <div className="flex items-center md:justify-around mt-12 md:flex-row flex-col">
                <div
                    onClick={handleClick}
                    style={{ width: '200px' }}
                    id="album"
                    className="hover:bg-[#1f2833] pb-2 justify-center text-[#66fcf1] bg-[#0b0c10]  py-3 pr-4 pl-4 rounded-3xl mb-4 font-normal hover:cursor-pointer flex border border-[#66fcf1]"
                >
                    Crear Álbum
                </div>
                <div
                    onClick={handleClick}
                    style={{ width: '200px' }}
                    id="simple"
                    className="hover:bg-[#1f2833] pb-2 justify-center text-[#66fcf1] bg-[#0b0c10]  py-3 pr-4 pl-4 rounded-3xl mb-4 font-normal hover:cursor-pointer flex border border-[#66fcf1]"
                >
                    Crear Simple
                </div>
            </div>
        </div>
    );
};
