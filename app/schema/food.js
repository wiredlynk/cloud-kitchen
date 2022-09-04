const foodGroup = {
  name: "food",
  order: 10,
};

const food = {
  collection: "food",
  fields: {
    // ID
    id: {
      type: "text",
      optional: true,
    },
    // Category
    category: {
      type: "text",
      required: true,
      publish: true,
      description: "example: Indian Breads",
    },
    // Timetstamp of category creation
    createdAt: {
      optional: true,
      publish: true,
      add: () => {
        return new Date().toISOString();
      },
    },
    // children: {
    //   title: {
    //     type: "text",
    //     required: true,
    //     publish: true,
    //     description: "example: Butter naan",
    //     group: foodGroup,
    //   },
    //   price: {
    //     type: "number",
    //     required: true,
    //     publish: true,
    //     description: "example: 35",
    //     group: foodGroup,
    //   },
    //   description: {
    //     type: "textarea",
    //     min: 10,
    //     max: 200,
    //     publish: true,
    //     description: "example: ingredients",
    //     group: foodGroup,
    //   },
    //   // Timetstamp of category creation
    //   createdAt: {
    //     optional: true,
    //     publish: true,
    //     add: () => {
    //       return new Date().toISOString();
    //     },
    //   },
    // },
  },
};

export default food;
