export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface createArtistDto extends Omit<Artist, 'id'> {}
export interface updateArtistDto extends createArtistDto {}
