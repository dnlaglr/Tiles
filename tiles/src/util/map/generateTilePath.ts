
type Point = {
  lat: number;
  lng: number;
}

export default function generateTilePath(centerLat: number, centerLng: number): Point[] {
  const EARTH_RADIUS = 6371;
  const delta = (4 / 2) / EARTH_RADIUS;

  const centerLatRad = (centerLat * Math.PI) / 180;
  const centerLngRad = (centerLng * Math.PI) / 180;

  const north = centerLatRad + delta;
  const south = centerLatRad - delta;
  const east = centerLngRad + delta / Math.cos(centerLatRad);
  const west = centerLngRad - delta / Math.cos(centerLatRad);

  return [
    { lat: (north * 180) / Math.PI, lng: (west * 180) / Math.PI },
    { lat: (north * 180) / Math.PI, lng: (east * 180) / Math.PI },
    { lat: (south * 180) / Math.PI, lng: (east * 180) / Math.PI },
    { lat: (south * 180) / Math.PI, lng: (west * 180) / Math.PI },
  ];
}