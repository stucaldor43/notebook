const tags = () => {
  return {
    fetchTags: async () => {
      return ["first", "second", "third"];
    },
    findTagByName: async (name) => {},
    createTag: async (name) => {},
    deleteTag: async (tag) => {}
  }
}

export default tags;