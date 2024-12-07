import { CoordPair, ORIGIN_LAT, ORIGIN_LNG, TILE_SIZE, Tile } from './tileConstants';

export function calculateTileSize(lat: number): { latTileSize: number; lngTileSize: number; } {
  const LAT_TILE_SIZE = TILE_SIZE / 111; // 1deg lat = 111km
  const LNG_TILE_SIZE = TILE_SIZE / (111 * Math.cos((lat * Math.PI) / 180));

  return { latTileSize: LAT_TILE_SIZE, lngTileSize: LNG_TILE_SIZE };
}

export function getTileBounds(tileX: number, tileY: number, latTileSize: number, lngTileSize: number): Tile {
  const west = ORIGIN_LNG + tileX * lngTileSize;
  const east = west + lngTileSize;
  const south = ORIGIN_LAT + tileY * latTileSize;
  const north = south + latTileSize;

  const cLat = (north + south ) / 2;
  const cLng = (east + west) / 2;

  return {
    tileX,
    tileY,
    center: {
      lat: cLat, 
      lng: cLng
    },
    bounds: {
      north, south, east, west
    }
  }
}

export function getTilePathBounds(north: number, south: number, east: number, west: number): CoordPair[] {
  return [
    { lat: north, lng: west },
    { lat: north, lng: east },
    { lat: south, lng: east },
    { lat: south, lng: west },
  ];
}

export function findTile(userLocation: CoordPair): Tile {
  const { latTileSize, lngTileSize } = calculateTileSize(userLocation.lat);
  const tileX = Math.floor((userLocation.lng - ORIGIN_LNG) / lngTileSize);
  const tileY = Math.floor((userLocation.lat - ORIGIN_LAT) / latTileSize);

  return getTileBounds(tileX, tileY, latTileSize, lngTileSize);
}