const settings = {
  collection: "users",
  fields: {
    displayName: {
      type: "text",
      required: true,
    },
    phoneNumber: {
      type: "tel",
      min: 10,
      // pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
    },
    email: {
      type: "email",
      disabled: true,
    },
    photoURL: {
      type: "text",
    },
  },
};

export default settings;
