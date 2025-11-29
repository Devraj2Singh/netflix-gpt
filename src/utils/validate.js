export const checkValidData = (email, password) => {
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  
    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
        .test(password);

    if(!email || !password) return "Both fields are required."
    if (!isEmailValid) return "⚠️ Email is not valid.";
    if (!isPasswordValid) return "⚠️ Password is not strong enough.";

  
    return null;
  };
  
