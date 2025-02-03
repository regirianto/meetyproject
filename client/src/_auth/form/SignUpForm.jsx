import { useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { signUp } from "../../api";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signUp(form);
      alert(res.data.message);
      navigate("/sign-in");
    } catch (error) {
      console.error("API ERROR: ", error.response?.data || error);
      alert(error.response?.data?.error || "Something ain't right");
    }
  };

  return (
    <main className="flex flex-col gap-8">
      <Header
        heading="Welcome!"
        desc="Let's get started by creating your account.."
      />

      {/* form */}
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-medium text-sm">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              className="input-class"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your@email.com"
              name="email"
              className="input-class"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium text-sm">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="62xxxxxxxxxx"
              name="phone"
              className="input-class"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              className="input-class"
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <Button
              label="Create account"
              type="primary"
              isLink={false}
              href="/base-profile"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;
