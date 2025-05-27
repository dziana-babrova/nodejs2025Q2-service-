export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface createTrackDto extends Omit<Track, 'id'> {}
export interface updateTrackDto extends createTrackDto {}
