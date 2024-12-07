import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { findTile } from '../util/tile/tileUtil';
import addTile from '../util/map/addTile';
import { auth } from '../firebase';

export default function UserLocation() {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            
            const tileCenter = findTile(userLocation);

            await addTile(user.uid, { lat: tileCenter.center.lat, lng: tileCenter.center.lng })
          }, (error) => {
            console.error("[ ERROR ] Could not fetch user location: ", error);
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.warn("[ WARNING ] User is not signed in to fetch location.");
      }
    })

    return () => unsubscribe();
  }, []);

  return null;
}