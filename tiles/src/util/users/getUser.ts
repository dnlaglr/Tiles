import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default async function getUser(userID: string) {
  try {
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, where("userID", "==", userID));
    const userDocs = await getDocs(usersQuery);
  
    if (userDocs.empty) {
      throw new Error(`No users found with userID: ${userID}`);
    }
  
    const userDoc = userDocs.docs[0];
    const userData = userDoc.data();
    return userData;
  } catch (error) {
    console.log("Error retreiving user: ", error);
    return null;
  }
}