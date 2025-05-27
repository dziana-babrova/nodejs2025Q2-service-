export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface createAlbumDto extends Omit<Album, 'id'> {}
export interface updateAlbumDto extends createAlbumDto {}
