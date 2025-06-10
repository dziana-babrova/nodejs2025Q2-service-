import { Album } from 'src/entities/album/album.interface';
import { Artist } from 'src/entities/artist/artist.interface';
import { Track } from 'src/entities/track/track.interface';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
