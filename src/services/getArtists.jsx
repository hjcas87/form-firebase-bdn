// import.meta.env.

export const getArtists = async (artista) => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    const url = `https://api.spotify.com/v1/search?q="${encodeURI(artista)}"&type=artist&limit=10`;

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: 'grant_type=client_credentials',
    });

    const { access_token } = await result.json();

    const resultado = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token,
        },
    });

    const { artists } = await resultado.json();

    const urls = artists.items.map((urls) => ({
        link: urls.external_urls.spotify,
        name: urls.name,
    }));
    return urls;
};
