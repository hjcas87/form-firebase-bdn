import { Fields } from "./Fields";

export const DistResume = ({idArtista, opciones_distribucion}) => {
    return (
        <div className="border rounded-xl border-black/30 p-5 my-5 shadow-lg shadow-black/30">
            <Fields
                data={opciones_distribucion}
                field={'Distribución digital:'}
            />

            {!idArtista.length ? (
                <Fields data={false} field={'Perfiles de Artistas:'} />
            ) : (
                <>
                    <p className="font-light">Perfiles de Artistas:</p>
                    {idArtista.map((id, i) =>
                        id[Object.keys(id)[0]] !== '' &&
                        id[Object.keys(id)[0]] !==
                            'No tiene perfil de artista' ? (
                            <Fields
                                key={i}
                                data={
                                    <a
                                        href={id[Object.keys(id)[0]]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-1 mb-3 flex gap-3 items-center text-indigo-900 normal-case"
                                    >
                                        Abrir en una ventana nueva
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </a>
                                }
                                field={
                                    <span className="capitalize text-sm">
                                        {Object.keys(id)[0]}:
                                    </span>
                                }
                            />
                        ) : id[Object.keys(id)[0]] === '' ? (
                            <Fields
                                key={i}
                                data={<span className="normal-case">- -</span>}
                                field={
                                    <span className="capitalize text-sm">
                                        {Object.keys(id)[0]}:
                                    </span>
                                }
                            />
                        ) : (
                            <Fields
                                key={i}
                                data={
                                    <span className="normal-case">
                                        {id[Object.keys(id)[0]]}
                                    </span>
                                }
                                field={
                                    <span className="capitalize text-sm">
                                        {Object.keys(id)[0]}:
                                    </span>
                                }
                            />
                        )
                    )}
                </>
            )}
        </div>
    );
};
