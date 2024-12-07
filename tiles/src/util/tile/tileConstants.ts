
export type CoordPair = {
  lat: number;
  lng: number;
}

export type Tile = {
  tileX: number;
  tileY: number;
  center: {
    lat: number;
    lng: number;
  }
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }
}

export const ORIGIN_LAT = 33.7838263;
export const ORIGIN_LNG = -118.1136125;
export const TILE_SIZE = 4; // Tile size in km;