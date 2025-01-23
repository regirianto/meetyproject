import Button from "../../components/Button";
import logo from "../../assets/img/logo.svg";

const SignInForm = () => {
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

      {/* form */}
      <div>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-medium text-sm">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input-class"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input-class"
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
