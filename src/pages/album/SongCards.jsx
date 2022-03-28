import { Link } from 'react-router-dom';

export const SongCards = ({ song, index }) => {
    // console.log(song.id);
    return (
        <div className="flex items-center sm:flex-row flex-col mb-10">
            <p className="flex-1 font-normal capitalize text-2xl text-center md:text-left sm:mb-0 mb-9">
                {index + 1}- {song.titulo}
            </p>

            <Link
                to={`/song/${song.id}`}
                className="bg-[#45a29e] hover:bg-[#3d918d] shadow-xl ml-2 text-lg text-white py-2 font-normal px-5 rounded-lg hover:cursor-pointer"
            >
                Editar
            </Link>
        </div>
    );
};
