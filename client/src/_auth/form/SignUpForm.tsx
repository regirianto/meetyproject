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
      <div className="my-14">
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-[11px]">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              type="text"
              className="w-full bg-[#EFFAF5] py-4 px-4 rounded-lg border-[1px] shadow-sm placeholder:text-xs text-xs font-light"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col gap-[11px]">
            <label htmlFor="username" className="text-sm">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-[#EFFAF5] py-4 px-4 rounded-lg border-[1px] shadow-sm placeholder:text-xs text-xs font-light"
              placeholder="Enter your email"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;
