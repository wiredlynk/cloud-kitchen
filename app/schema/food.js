const menu = {
  collection: "menu",
  fields: {
    // ID
    id: {
      type: "text",
      optional: true,
    },
    title: {
      type: "text",
      required: true,
      publish: true,
      description: "example: Butter naan",
    },
    price: {
      type: "number",
      required: true,
      publish: true,
      description: "example: 35",
    },
    description: {
      type: "textarea",
      min: 10,
      max: 200,
      publish: true,
      description: "example: ingredients",
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

export default menu;
