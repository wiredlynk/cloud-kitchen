const forgotPassword = {
  collection: "users",
  fields: {
    email: {
      type: "email",
      required: true,
    },
  },
};

export default forgotPassword;
