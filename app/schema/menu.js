const category = {
  collection: "category",
  fields: {
    // ID
    id: {
      type: "text",
      optional: true,
    },
    // Title
    title: {
      type: "text",
      required: true,
      publish: true,
      description: "example: Indian Breads",
    },
    // Description, optional
    description: {
      type: "textarea",
      min: 10,
      max: 200,
    },
    // Timetstamp of category creation
    createdAt: {
      optional: true,
      publish: true,
      add: () => {
        return new Date().toISOString();
      },
    },
  },
};
export default category;
