import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { db } from '../../firebase';

export default async function deleteUserData(auth: any, userID: string) {
  try {
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, where("userID", "==", userID));
    const userDocs = await getDocs(usersQuery);
  
    if (userDocs.empty) {
      throw new Error(`No users found with userID: ${userID}`);
    }
  
    const userDoc = userDocs.docs[0];
  
    await deleteDoc(userDoc.ref);
    console.log("[ INFO ] Successfully deleted user document.");

    await deleteUser(auth?.currentUser).then(() => {
      console.log("[ INFO ] Successfully deleted user account.");
    }).catch((error) => {
      console.error("[ ERROR ] Could not delete user account: ", error);
    })

  } catch (err) {
    console.error("[ ERROR ] Could not delete user: ", err);
  }
}