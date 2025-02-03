import Button from "../../components/Button";
import logo from "../../assets/img/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api";

const SignInForm = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Login Data: ", form);

    try {
      const res = await signIn(form);
      alert(res.data.message);

      // save token to localstorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/home");
    } catch (error) {
      console.error("LOGIN error: ", error.response?.data || error);
      setError(error.response?.data?.error || "Something ain't right");
    }
  };

  return (
    <main className="flex flex-col px-3 gap-10">
      <div className="flex flex-col items-center">
        <div>
          <img src={logo} alt="logo meety" />
        </div>
        <div className="text-center text-sm font-light leading-6 -mt-4">
          <p>
            Welcome to Meety!
            <br />
            Find friends & Love nearby
          </p>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      {/* form */}
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-medium text-sm">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
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
              name="password"
              placeholder="Enter your password"
              className="input-class"
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <Button label="Sign In" type="primary" isLink={false} />
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignInForm;
