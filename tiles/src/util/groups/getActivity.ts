import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

export default async function getActivity(userID: string) {
  try {
    const groupsRef = collection(db, "groups");
    const groupQuery = query(groupsRef, where("memberIDs", "array-contains", userID));
    const groupDocs = await getDocs(groupQuery);

    let groupActivity = [];
    groupDocs.forEach((doc) => {
      const groupData = doc.data();
      if (groupData.activityLog) {
        groupActivity.push(...groupData.activityLog);
      }
    });

    groupActivity.sort((a, b) => b.timestamp - a.timestamp);
    return groupActivity;

  } catch (err) {
    console.error("[ ERROR ] Could not get group activity: ", err);
  }
}