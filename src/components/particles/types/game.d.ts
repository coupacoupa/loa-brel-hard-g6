export interface Tiles {
  [order: number]: Tile;
}
export interface Tile {
  clock: number;
  health: number;
  order: number;
  placement: Placement;
  destroyedBy188?: boolean;
}

export interface Placement {
  blue: number[];
  yellow: boolean;
}

export interface Path {
  blue: number[];
  yellow: number;
}
