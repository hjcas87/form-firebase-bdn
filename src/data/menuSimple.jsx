import { BasicInfo } from '../pages/album/BasicInfo';
import { DistInfo } from '../pages/album/DistInfo';
import { ExtendSongInfo } from '../pages/album/ExtendSongInfo';
import { GenderInfo } from '../pages/album/GenderInfo';
import { IdArtistInfo } from '../pages/album/IdArtistInfo';
import { IsrcInfo } from '../pages/album/IsrcInfo';
import { ResumeScreen } from '../pages/album/ResumeScreen';
import { SongScreen } from '../pages/album/SongScreen';
import { UpcInfo } from '../pages/album/UpcInfo';
import { UploadFileScreen } from '../pages/album/UploadFileScreen';
import { UploadWavFilesScreen } from '../pages/album/UploadWavFilesScreen';

export const menuSimple = [
    { id: 'resume', tabTitle: 'Resumen', tabContent: <ResumeScreen /> },
    { id: 1, tabTitle: 'Información básica', tabContent: <BasicInfo /> },
    { id: 2, tabTitle: 'Código de barras/Upc', tabContent: <UpcInfo /> },
    { id: 3, tabTitle: 'Canción', tabContent: <SongScreen /> },
    { id: 4, tabTitle: 'Géneros/Localización', tabContent: <GenderInfo /> },
    { id: 5, tabTitle: 'Códigos ISRC', tabContent: <IsrcInfo /> },
    { id: 6, tabTitle: 'Distribución', tabContent: <DistInfo /> },
    { id: 7, tabTitle: 'Perfil de artista', tabContent: <IdArtistInfo /> },
    {
        id: 8,
        tabTitle: 'Canciones extendidas',
        tabContent: <ExtendSongInfo />,
    },
    { id: 9, tabTitle: 'Subir portada', tabContent: <UploadFileScreen /> },
    { id: 10, tabTitle: 'Subir audio', tabContent: <UploadWavFilesScreen /> },
];
