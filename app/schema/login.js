const login = {
  collection: "users",
  fields: {
    email: {
      type: "email",
      required: true,
    },
    password: {
      type: "password",
      required: true,
    },
  },
};

export default login;
