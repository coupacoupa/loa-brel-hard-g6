export interface Tiles {
  [clock: number]: Tile;
}
export interface Tile {
  clock: number;
  health: number;
  order: number;
  placement: Placement[];
}

export interface Meteor {
  type: "BLUE" | "YELLOW";
  clock: number;
}
export interface Placement {
  type: "BLUE" | "YELLOW";
  order: number;
}
