export interface Tiles {
  [order: number]: Tile;
}
export interface Tile {
  clock: number;
  health: number;
  order: number;
}

export interface Placement {
  [order: number]: {
    blue: number[];
    yellow: boolean;
  };
}
export interface Path {
  blue: number[];
  yellow: number;
}
