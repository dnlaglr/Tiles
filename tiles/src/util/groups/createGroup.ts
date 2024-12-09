import { Timestamp, addDoc, arrayUnion, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';

function generateRandomString(len: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let res = '';
  for (let i = 0; i < len; i++) {
    const randIdx = Math.floor(Math.random() * chars.length);
    res += chars[randIdx];
  }

  return res;
}

function generateGroupID(): string {
  return generateRandomString(10);
}

function generateGroupCode(): string {
  return generateRandomString(5);
}

export default async function createGroup(userID: string, groupName: string) {
  const groupsRef = collection(db, "groups");
  const groupID = generateGroupID();
  const groupDocRef = await addDoc(groupsRef, {
    acivityLog: [],
    creationDate: Timestamp.now(),
    groupID: groupID,
    groupName: groupName,
    joinCode: generateGroupCode(),
    memberIDs: [userID]
  });

  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, where("userID", "==", userID));
  const usersSnapshot = await getDocs(usersQuery);
  const userData = usersSnapshot.docs[0].data();

  const membersRef = collection(groupDocRef, "members");
  await addDoc(membersRef, {
    displayName: userData.displayName,
    hexColor: "#FF0000",
    joinDate: Timestamp.now(),
    tiles: [],
    userID: userID
  });

  await updateDoc(usersSnapshot.docs[0].ref, {
    joinedGroups: arrayUnion(groupID)
  });
}