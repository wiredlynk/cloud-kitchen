const kitchens = {
  collection: "kitchens",
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
    },
    description: {
      type: "textarea",
      min: 10,
      max: 200,
      publish: true,
    },
    // Breakfast timings
    breakFastTimings: {
      type: "text",
      required: true,
      description: "example: 7AM-10AM",
    },
    // Lunch timings
    lunchTimings: {
      type: "text",
      required: true,
      description: "example: 12PM-3PM",
    },
    // Evening snacks timings
    eveningSnacksTimings: {
      type: "text",
      required: true,
      description: "example: 4PM-6PM",
    },
    // Dinner timings
    dinnerTimings: {
      type: "text",
      required: true,
      description: "example: 8PM-11PM",
    },
    // Note
    note: {
      type: "textarea",
      min: 10,
      max: 200,
      publish: true,
    },
    // Tag hotel
    hotel: {
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

export default kitchens;
