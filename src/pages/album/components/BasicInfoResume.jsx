import { Fields } from './Fields';
import { RequiredFields } from './RequiredFields';

export const BasicInfoResume = ({ data }) => {
    const {
        photoUrl,
        artista_principal,
        titulo_album,
        artistas_secundarios,
        fecha_lanzamiento,
        idioma,
    } = data.info_basica;
    const { UPC, solicitaUpc } = data.codigo_barra;
    const {
        artista_similar_1,
        artista_similar_2,
        artista_similar_3,
        localizacion,
        genero_1,
        genero_2,
    } = data.generoYLocalizacion;

    return (
        <>
            <div className="w-full flex items-start flex-col sm:flex-row border-b pb-4 mb-4 border-black/20">
                {!photoUrl || photoUrl === '' ? (
                    <div className="w-full sm:w-1/2 flex justify-center items-center text-center">
                        <p className="absolute px-12 text-gray-700">
                            Aún no has seleccionado una imagén
                        </p>
                        <div className="w-4/5 mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                fill="#d5d5d5"
                            >
                                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM80.72 256H79.63c-9.078 0-16.4-8.011-15.56-17.34C72.36 146 146.5 72.06 239.3 64.06C248.3 63.28 256 70.75 256 80.09c0 8.35-6.215 15.28-14.27 15.99C164.7 102.9 103.1 164.3 96.15 241.4C95.4 249.6 88.77 256 80.72 256zM256 351.1c-53.02 0-96-43-96-95.1s42.98-96 96-96s96 43 96 96S309 351.1 256 351.1zM256 224C238.3 224 224 238.2 224 256s14.3 32 32 32c17.7 0 32-14.25 32-32S273.7 224 256 224z" />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <img
                        src={photoUrl}
                        alt={artista_principal}
                        className="sm:w-1/2 mb-5 sm:mb-0 mr-3 shadow-md shadow-black/75 rounded-sm"
                    />
                )}
                <div className="flex-1 md:px-3 w-full">
                    <h2 className="text-2xl mb-1 md:text-left font-normal capitalize">
                        {titulo_album}
                    </h2>
                    <Fields
                        data={artista_principal}
                        field={'Artista principal:'}
                    />
                    {artistas_secundarios.length ? (
                        <>
                            <Fields
                                field={'Artista Secundario:'}
                                data={true}
                            />
                            {artistas_secundarios.map((data, i) => (
                                <Fields
                                    key={i}
                                    data={data.artista_secundario}
                                />
                            ))}
                        </>
                    ) : null}

                    <Fields
                        data={fecha_lanzamiento}
                        field={'Fecha de lanzamiento:'}
                    />
                    <Fields data={idioma} field={'Idioma del lanzamiento:'} />
                </div>
            </div>
            <div className="flex w-full flex-col md:flex-row border-b pb-4 mb-4 border-black/20">
                <div className="flex-1 md:px-3">
                    <div className="my-1">
                        <div>
                            {solicitaUpc === '' ? (
                                <>
                                    <Fields field={'UPC:'} data={null} />
                                </>
                            ) : UPC === '' ? (
                                <>
                                    <Fields
                                        field={'UPC:'}
                                        data={'Has solicitado un codigo'}
                                    />
                                </>
                            ) : (
                                <>
                                    <Fields field={'UPC:'} data={UPC} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex-1 md:px-3">
                    <Fields
                        field={'Localidad del artista:'}
                        data={localizacion}
                    />
                </div>
            </div>
            <div className="flex w-full flex-col md:flex-row border-b pb-4 mb-4 border-black/20">
                <div className="flex-1 md:px-3">
                    {artista_similar_1 === '' ||
                    artista_similar_2 === '' ||
                    artista_similar_3 === '' ? (
                        <Fields field={'Artistas similares'} data={null} />
                    ) : (
                        <Fields field={'Artistas similares'} data={[]} />
                    )}

                    <Fields data={artista_similar_1} />
                    <Fields data={artista_similar_2} />
                    <Fields data={artista_similar_3} />
                </div>

                <div className="flex-1 md:px-3">
                    {genero_1 === '' || genero_2 === '' ? (
                        <Fields field={'Generos'} data={null} />
                    ) : (
                        <Fields field={'Generos'} data={true} />
                    )}

                    <Fields data={genero_1} />
                    <Fields data={genero_2} />
                </div>
            </div>
        </>
    );
};
