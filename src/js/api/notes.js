const notes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  return {
    fetchNotes: async () => {
      return (await db.collection("users")
        .doc(user.name)
        .collection("notes")
        .get())
        .docs
        .map((noteQueryDocSnapshot) => noteQueryDocSnapshot.data());
    },
    findNote: async (id) => {
      return (await db.collection("users")
        .doc(user.name)
        .collection("notes")
        .doc(id)
        .get())
        .data()
    },
    updateNote: async (id, note) => {
      await db.collection("users")
        .doc(user.name)
        .collection("notes")
        .doc(id)
        .set(note, { merge: true });
    },
    createNote: async (note) => {
      await db.collection("users")
      .doc(user.name)
      .collection("notes")
      .doc(note.id)
      .set(note);
    },
    deleteNote: async (id) => {
      db.collection("users")
        .doc(user.name)
        .collection("notes")
        .doc(id)
        .delete();
    }
  }
}

export default notes;