import { arrayUnion, collection, GeoPoint, getDocs, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';

type CoordPair = {
  lat: number;
  lng: number;
}

export default async function addTile(userID: string, center: CoordPair) {
  try {
    const groupsRef = collection(db, "groups");
    const groupsQuery = query(groupsRef, where("memberIDs", "array-contains", userID));
    const groupsSnapshot = await getDocs(groupsQuery);

    if (groupsSnapshot.empty) {
      console.warn(`[ WARNING ] No groups found for user ${userID}`)
      return;
    }

    const groupsDocs = groupsSnapshot.docs;
    
    for (const doc of groupsDocs) {
      const docRef = doc.ref;
  
      const membersRef = collection(docRef, "members");
      const membersQuery = query(membersRef, where("userID", "==", userID));
      const membersSnapshot = await getDocs(membersQuery);

      if (membersSnapshot.empty) {
        console.warn(`[ WARNING ] No member document found for user ${userID} in group ${doc.id}.`);
        continue;
      }

      if (membersSnapshot.docs.length > 1) {
        console.warn(`[ WARNING ] Found multiple member documents for ${userID} in one group.`)
      }
  
      /* Update member tiles array */
      const memberDoc = membersSnapshot.docs[0];
      await updateDoc(memberDoc.ref, {
        tiles: arrayUnion(new GeoPoint(center.lat, center.lng))
      })

      /* Update group activity feed. */
      await updateDoc(docRef, {
        activityLog: arrayUnion({
          displayName: memberDoc.data().displayName,
          timestamp: Timestamp.now(),
          unlockedCoords: new GeoPoint(center.lat, center.lng)
        })
      })
    }
  } catch (err) {
    console.error("[ ERROR ] Could not update user-unlocked tiles: ", err);
  }
}