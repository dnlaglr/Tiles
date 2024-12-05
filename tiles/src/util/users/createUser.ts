import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'

export default async function createUser(userData: any) {
  try {
    const usersRef = collection(db, "users");
    const userDocRef = await addDoc(usersRef, {
      displayName: userData.displayName,
      email: userData.email,
      userID: userData.userID
    });

    console.log("[ INFO ] User document created with ID: ", userDocRef.id);
  } catch (err) {
    console.error("[ ERROR ] Could not create user document.")
  }
}