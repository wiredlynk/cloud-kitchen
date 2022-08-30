import { getFirestore } from "firebase-admin/firestore";
import { createUser } from "~/skawe/firebase/user.server";

// helper function to convert firestore data to typescript
const converter = () => ({
  toFirestore: (data) => data,
  fromFirestore: (snap) => snap.data(),
});

// helper to apply converter to multiple collections
const dataPoint = (collectionPath) =>
  getFirestore().collection(collectionPath).withConverter(converter());

const db = {
  modules: (category) => dataPoint(category),
};

export const getDocs = async (category) => {
  let results = [];
  const docSnap = await db.modules(category).get();
  docSnap.forEach((item) => {
    const setResults = {
      id: item.id,
      ...item.data(),
    };
    results.push(setResults);
  });
  return results;
};

export const getDoc = async (category, docId) => {
  const docSnap = await db.modules(category).doc(docId).get();
  return docSnap.data();
};

export const addDoc = async (category, data, addUser) => {
  if (addUser) {
    const newDocRef = db.modules(category);
    await newDocRef.add(data);
    const setUserData = {
      email: data["email"],
      password: data["password"],
      displayName: data["name"],
      __collection: data["__collection"],
    };
    await createUser(setUserData, addUser);
  } else {
    const newDocRef = db.modules(category);
    await newDocRef.add(data);
  }
};

export const editDoc = async (category, docId, data) => {
  const docSnap = await db.modules(category).doc(docId);
  Object.keys(data).forEach((k) => data[k] == null && delete data[k]);
  await docSnap.update({ ...data });
};

export const removeDoc = async (category, docId) => {
  await db.modules(category).doc(docId).delete();
};
