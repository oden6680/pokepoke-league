import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import { Match } from "../types/match";

export async function getAllMatches(): Promise<Match[]> {
  const q = query(collection(db, "matches"), orderBy("matchDate", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Match));
}

export async function addMatch(matchData: Omit<Match, "id">) {
  await addDoc(collection(db, "matches"), matchData);
}
