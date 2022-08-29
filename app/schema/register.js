const register = {
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
    // role: {
    //   type: "radio",
    //   required: true,
    //   options() {
    //     return [
    //       { value: "kitchen", label: "Kitchen" },
    //       { value: "hotel", label: "Hotel" },
    //     ];
    //   },
    // },
  },
};

export default register;
