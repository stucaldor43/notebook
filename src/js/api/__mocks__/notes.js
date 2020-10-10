const notes = () => {
  return {
    fetchNotes: async () => {
      return [
        {
          title: "Ezel's First Note",
          selected: true,
          dateCreated: { nanoseconds: 481000000, seconds: 1599786497 },
          id: "04899fd7-6c40-4b17-b8ac-c01411c96bc7",
          text: "I have no idea if this will work. Maybe it did",
          tags: ["Sporst", "Skiing", "2"]
        },
        {
          title: "Ezel's Second Note",
          selected: false,
          dateCreated: { nanoseconds: 481000000, seconds: 1599786494 },
          id: "04899fd7-6c40-4b17-b9ad-c01411c96bc7",
          text: "It works!!! I can't believe it",
          tags: ["Sports"]
        }
      ];
    },
    findNote: async (id) => {
      return {
        title: "Ezel's First Note",
        selected: true,
        dateCreated: { nanoseconds: 481000000, seconds: 1599786497 },
        id: "04899fd7-6c40-4b17-b8ac-c01411c96bc7",
        text: "I have no idea if this will work. Maybe it did",
        tags: ["Sporst", "Skiing", "2"]
      };
    },
    updateNote: async (id, note) => {},
    createNote: async (note) => {},
    deleteNote: async (id) => {}
  }
}

export default notes;