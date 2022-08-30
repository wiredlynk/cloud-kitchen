const kitchens = {
  collection: "kitchens",
  createUser: true,
  fields: {
    // ID
    id: {
      type: "text",
      optional: true,
    },
    name: {
      type: "text",
      required: true,
      publish: true,
      description: "example: Kitchen/Restaurant name",
    },
    description: {
      type: "textarea",
      min: 10,
      max: 200,
      publish: true,
    },
    owner: {
      type: "text",
      required: true,
      publish: true,
    },
    // Phone number
    phoneNumber: {
      type: "tel",
      min: 10,
      max: 12,
      // required: true,
    },
    // Email address
    email: {
      type: "email",
      required: true,
      publish: true,
      description: "example: abc@abc.com",
    },
    // Email address
    password: {
      type: "password",
      required: true,
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
