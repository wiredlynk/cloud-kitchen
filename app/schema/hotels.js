const hotels = {
  collection: "hotels",
  fields: {
    // ID
    id: {
      type: "text",
      optional: true,
    },
    // Hotel name
    name: {
      type: "text",
      required: true,
      publish: true,
    },
    phoneNumber: {
      type: "tel",
      min: 10,
      max: 12,
    },
    address: {
      type: "textarea",
      min: 10,
      max: 300,
      publish: true,
    },
    // Tag Kitchen
    kitchen: {
      type: "text",
      optional: true,
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

export default hotels;
