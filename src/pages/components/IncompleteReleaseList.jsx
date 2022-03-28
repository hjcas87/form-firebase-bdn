import { Link } from 'react-router-dom';
// const imgPath = require.context('../../assets', true);

export const IncompleteReleaseList = () => {
    return (
        <>
            {[1, 2, 3, 4].map((release) => (
                <div
                key={release}
                className="bg-white rounded-xl shadow-xl shadow-black p-5 mb-8"
            >
                <div className='flex gap-5 md:flex-row flex-col'>
                    <div className="md:w-36 w-full h-36 overflow-hidden">
                        <img src="../../src/assets/alanparson.png" alt="" className='mx-auto'/>
                    </div>
                    <div>
                        <h2 className='text-4xl'>Titulo lanzamiento {release}</h2>
                        <p className='my-2'>
                            Nombre banda/artista: <span className='font-bold'>Charly Garcia</span>
                        </p>
                        <p className='my-2'>
                            Fecha de lanzamiento: <span className='font-bold'>00-00-000</span>
                        </p>
                    </div>
                </div>
                <div>
                    <button className='bg-stone-900 shadow-lg shadow-black hover:bg-black text-white font-bold py-2 px-4 rounded-lg mt-4 mb-2 w-full'>
                        <Link to="/album">Ver más...</Link>
                    </button>
                </div>
            </div>
            ))}
        </>
    );
};
