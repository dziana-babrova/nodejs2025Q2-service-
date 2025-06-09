export class FavoriteDto {
  type: 'Artist' | 'Album' | 'Track';
  artistId?: string | null;
  trackId?: string | null;
  albumId?: string | null;
}
