import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Key, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';

import { useAuth } from '../contexts/AuthContext';
import { Polygon } from '../components/Polygon';

import getTiles from '../util/map/getTiles';
import generateTilePath from '../util/map/generateTilePath';
import { findTile, getTilePathBounds } from '../util/tile/tileUtil';

export default function Tiles() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [mapTiles, setMapTiles] = useState<DocumentData | []>([]);

  useEffect(() => {
    if (!auth?.currentUser) {
      navigate('/auth/login');
    }

    async function fetchMapTiles() {
      if (auth?.currentUser?.uid) {
        const memberSnapshot = await getTiles(auth.currentUser.uid);
        setMapTiles(memberSnapshot);
      }
    }

    fetchMapTiles();
  }, [])

  console.log("mapTiles: ", mapTiles)
  
  return (
    <div className="flex justify-center items-center w-screen h-[calc(100vh_-_56px)]">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={{ lat: 33.783042, lng: -118.1118519 }}
          defaultZoom={14}
          disableDefaultUI={true}
        >
          {mapTiles.length === 0
            ? null
            : mapTiles.map((memberObject, index: Key) => {
                if (!memberObject.tiles || memberObject.tiles.length === 0) {
                  return null;
                }

                console.log('member object:', memberObject);

                return memberObject.tiles.map((tilePoint, tileIndex) => {
                  console.log("tilePoint_lng", tilePoint._long)
                  const foundTile = findTile({lat: tilePoint._lat, lng: tilePoint._long});
                  const paths = getTilePathBounds(foundTile.bounds.north, foundTile.bounds.south, foundTile.bounds.east, foundTile.bounds.west);
                  console.log('tilepoint:', tilePoint);
                  console.log('paths:', paths);

                  return (
                    <Polygon
                      key={`${index}-${tileIndex}`}
                      strokeWeight={1}
                      strokeColor={memberObject.hexColor}
                      fillColor={memberObject.hexColor}
                      fillOpacity={0.1}
                      paths={paths}
                    />
                  );
                });
              })}
        </Map>
      </APIProvider>
    </div>
  );
}