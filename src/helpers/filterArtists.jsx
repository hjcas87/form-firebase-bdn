export const filterArtists = ( data, artistsProfiles, i ) => {
    
    artistsProfiles.map( profiles => {
        if (profiles.id === data.id) {
            if ( !data.datos || data.datos.length === 0 ) {
                profiles.notFound = true;
                profiles.loading = false;
                return profiles;
            } else {
                data.datos.forEach( artistId => {
                    if(profiles.name === artistId.name.toLowerCase()) {
                        profiles.datos = [...profiles.datos, artistId];
                        profiles.notFound = false;
                        profiles.loading = false;
                        return profiles;
                    } else if ( profiles.datos.length === 0 ) {
                        // console.log(data.datos)
                        profiles.notFound = true;
                        profiles.loading = false;
                        return profiles;
                    }
                });
            }
        }
        return profiles
    })
   
    return artistsProfiles;
}