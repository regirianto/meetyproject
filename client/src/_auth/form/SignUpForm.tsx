import { useState } from "react";

const SignUpForm = () => {
  // structure form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: {
      country_code: "+62",
      number: "",
    },
    password: "",
    confirmPassword: "",
  });

  return (
    <main>
      <div className="text-green-primary ">
        <h2 className="font-semibold text-2xl">Welcome!</h2>
        <p className="text-sm mt-2">
          Let's get started by creating your account. Please fill in the details
          below to join us.
        </p>
      </div>
      <div>
        <form></form>
      </div>
    </main>
  );
};

export default SignUpForm;
