export interface Tiles {
  [clock: number]: Tile;
}
export interface Tile {
  clock: number;
  health: number;
  order: number;
  placement: Placement[];
  destroyedBy188?: boolean;
}
export interface Placement {
  type: "BLUE" | "YELLOW";
  order: number;
}
