const tags = (user) => {
  return {
    fetchTags: async () => {
      return (await db.collection("users")
        .doc(user.displayName)
        .collection("tags")
        .get())
        .docs
        .map((tagQueryDocSnapshot) => tagQueryDocSnapshot.data())
        .map((tag) => tag.name);
    },
    findTagByName: async (name) => {
      const tags = (await db.collection("users")
        .doc(user.displayName)
        .collection("tags")
        .where("name", "==", name)
        .get())
        .docs
        .map((tagQueryDocSnapshot) => tagQueryDocSnapshot.data())
        .map((tag) => tag.name);
      if (tags.length === 0) return undefined;

      return tags[0];
    },
    createTag: async (name) => {
      try {
        await db.collection("users")
          .doc(user.displayName)
          .collection("tags")
          .doc(name)
          .set({
            name
          });
      }
      catch (error) {
        throw error;
      }
    },
    deleteTag: async (tag) => {
      return await db.runTransaction(async function (transaction) {
        (await db.collection("users")
          .doc(user.displayName)
          .collection("notes")
          .where("tags", "array-contains", tag)
          .get())
          .forEach((noteQueryDocumentSnapshot) => {
            transaction.set(noteQueryDocumentSnapshot.ref, {
              tags: db.FieldValue.arrayRemove(tag)
            }, { merge: true })
          });
        transaction.delete(db.collection("users")
          .doc(user.displayName)
          .collection("tags")
          .doc(tag))
        return;
      })
    }
  }
}

export default tags;