const hotels = {
  collection: "hotels",
  createUser: true,
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
      description: "example: Hotel name",
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
      mustComplete: true,
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
    streetAddress: {
      type: "text",
      publish: true,
      mustComplete: true,
    },
    pinCode: {
      type: "number",
      publish: true,
      mustComplete: true,
    },
    state: {
      type: "text",
      publish: true,
      mustComplete: true,
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
