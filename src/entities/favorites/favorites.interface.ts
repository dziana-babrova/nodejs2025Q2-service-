import { Album } from 'src/entities/album/album.interface';
import { Artist } from 'src/entities/artist/artist.interface';
import { Track } from 'src/entities/track/track.interface';

export interface Favorites {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
