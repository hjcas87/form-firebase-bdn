import { AlbumInformation } from '../pages/album/AlbumInformation';
import { BasicInfo } from '../pages/album/BasicInfo';
import { DistInfo } from '../pages/album/DistInfo';
import { ExtendSongInfo } from '../pages/album/ExtendSongInfo';
import { GenderInfo } from '../pages/album/GenderInfo';
import { IdArtistInfo } from '../pages/album/IdArtistInfo';
import { IsrcInfo } from '../pages/album/IsrcInfo';
import { ResumeScreen } from '../pages/album/ResumeScreen';
import { SongList } from '../pages/album/SongList';
import { UpcInfo } from '../pages/album/UpcInfo';
import { UploadFileScreen } from '../pages/album/UploadFileScreen';
import { UploadWavFilesScreen } from '../pages/album/UploadWavFilesScreen';

export const data = [
    { id: 'resume', tabTitle: 'Resumen', tabContent: <ResumeScreen /> },
    { id: 1, tabTitle: 'Información básica', tabContent: <BasicInfo /> },
    { id: 2, tabTitle: 'Código de barras/Upc', tabContent: <UpcInfo /> },
    {
        id: 3,
        tabTitle: 'Información del álbum',
        tabContent: <AlbumInformation />,
    },
    { id: 4, tabTitle: 'Canciones', tabContent: <SongList /> },
    { id: 5, tabTitle: 'Géneros/Localización', tabContent: <GenderInfo /> },
    { id: 6, tabTitle: 'Códigos ISRC', tabContent: <IsrcInfo /> },
    { id: 7, tabTitle: 'Distribución', tabContent: <DistInfo /> },
    { id: 8, tabTitle: 'Perfil de artista', tabContent: <IdArtistInfo /> },
    { id: 9, tabTitle: 'Canciones extendidas', tabContent: <ExtendSongInfo /> },
    { id: 10, tabTitle: 'Subir portada', tabContent: <UploadFileScreen /> },
    { id: 11, tabTitle: 'Subir audio', tabContent: <UploadWavFilesScreen /> },
];
