import { Fields } from './Fields';

export const InfoSongCard = ({ song, info, codes }) => {
    const { artista_principal, artistas_secundarios } = info;
    const { codigo_ISRC, num_codigo } = codes;
    const {
        artistas_destacados,
        composicion,
        compositores,
        idioma,
        lenguaje_explicito,
        otro_idioma,
        titulo,
        version,
    } = song;

    return (
        <div className="border rounded-xl border-black/30 p-5 my-5 shadow-lg shadow-black/30">
            <div className="flex flex-col sm:flex-row gap-1 text-sm border-b border-black/30">
                <div className="flex-1">
                    <h3 className="text-xl capitalize">{titulo}</h3>
                    <div className="my-1">
                        <p className="capitalize text-sm">
                            {artista_principal}{' '}
                            {artistas_destacados?.length ? (
                                <span>
                                    (feat.{' '}
                                    {artistas_destacados.length > 1
                                        ? artistas_destacados.map((item, i) => (
                                              <span key={i}>
                                                  {item !==
                                                  artistas_destacados[
                                                      artistas_destacados.length -
                                                          1
                                                  ]
                                                      ? item ===
                                                        artistas_destacados[
                                                            artistas_destacados.length -
                                                                2
                                                        ]
                                                          ? `${item.artista_destacado} & `
                                                          : `${item.artista_destacado}, `
                                                      : ` ${item.artista_destacado}`}
                                              </span>
                                          ))
                                        : null}
                                    )
                                </span>
                            ) : null}
                        </p>
                    </div>
                    {artistas_secundarios?.length ? (
                        <>
                            {artistas_secundarios.map((art, i) => (
                                <p className="capitalize my-1 text-sm" key={i}>
                                    {art.artista_secundario}
                                </p>
                            ))}
                        </>
                    ) : null}
                </div>
                <div className="flex-1">
                    <Fields data={composicion} field={'Tipo de composición'} />
                    <Fields
                        data={lenguaje_explicito}
                        field={'Contenido explícito'}
                    />
                    <Fields data={version} field={'Tipo de grabación'} />
                </div>
                <div className="flex-1">
                    {idioma !== 'Otro' ? (
                        <Fields data={idioma} field={'Idioma de la letra'} />
                    ) : (
                        <Fields
                            data={otro_idioma}
                            field={'Idioma de la letra'}
                        />
                    )}
                    {codigo_ISRC === '' ? (
                        <Fields data={codigo_ISRC} field={'ISRC'} />
                    ) : codigo_ISRC === 'necesita_codigos' ? (
                        <Fields data={'Solicitaste código'} field={'ISRC'} />
                    ) : (
                        num_codigo.map((code, i) =>
                            Object.keys(code).some(
                                (cod) => cod === song.titulo
                            ) ? (
                                <Fields
                                key={i}
                                    data={
                                        code[titulo] !== ''
                                            ? code[titulo]
                                            : 'Solicitaste código'
                                    }
                                    field={'ISRC'}
                                />
                            ) : null
                        )
                    )}
                </div>
            </div>
            <div className="w-full pt-2 text-sm">
                {!compositores?.length ? (
                    <Fields field={'Compositor:'} />
                ) : (
                    <div>
                        {compositores.length > 1 ? (
                            <Fields data={true} field={'Compositores:'} />
                        ) : (
                            <Fields data={true} field={'Compositor:'} />
                        )}
                        {compositores.map((item, i) => (
                            <div key={i}>
                                <Fields data={item.compositor} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
