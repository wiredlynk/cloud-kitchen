const otpLogin = {
    collection: "users",
    fields: {
      otpPhone: {
        type: "tel",
        required: true,
      },
    },
  };
  
  export default otpLogin;
  