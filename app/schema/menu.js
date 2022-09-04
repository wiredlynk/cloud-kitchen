const menuGroup = {
  name: "food",
  order: 10,
};

const menu = {
  collection: "menu",
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
    // children: {
    // title: {
    //   type: "text",
    //   required: true,
    //   publish: true,
    //   description: "example: Butter naan",
    //   group: menuGroup,
    // },
    // price: {
    //   type: "number",
    //   required: true,
    //   publish: true,
    //   description: "example: 35",
    //   group: menuGroup,
    // },
    // description: {
    //   type: "textarea",
    //   min: 10,
    //   max: 200,
    //   publish: true,
    //   description: "example: ingredients",
    //   group: menuGroup,
    // },
    // },
  },
};
export default menu;
