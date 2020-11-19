import firebase from "./../src/database/db";
const db = firebase.firestore();

export async function deleteNoteByTitle(title) {
  const noteRefs = (await db.collection("users")
    .doc(JSON.parse(window.localStorage.getItem("user")).name)
    .collection("notes")
    .where("title", "==", title)
    .get())
    .docs
    .map((noteQueryDocSnapshot) => {
      return noteQueryDocSnapshot.ref;
    })
  for (const ref of noteRefs) {
    ref.delete();
  }
}

export async function updateNoteByTitle(title, fields) {
  const noteUpdatePromiseArray = (await db.collection("users")
    .doc(JSON.parse(window.localStorage.getItem("user")).name)
    .collection("notes")
    .where("title", "==", title)
    .get())
    .docs
    .map((noteQueryDocSnapshot) => noteQueryDocSnapshot.ref.set(fields, {merge: true}));
  await Promise.all(noteUpdatePromiseArray);
}

export async function deleteTagByName(name) {
  const tagRefs = (await db.collection("users")
    .doc(JSON.parse(window.localStorage.getItem("user")).name)
    .collection("tags")
    .where("name", "==", name)
    .get())
    .docs
    .map((tagQueryDocSnapshot) => tagQueryDocSnapshot.ref)
  for (const ref of tagRefs) {
    ref.delete();
  }
}