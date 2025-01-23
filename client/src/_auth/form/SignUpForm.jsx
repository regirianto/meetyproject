import Button from "../../components/Button";
import Header from "../../components/Header";

const SignUpForm = () => {
  return (
    <main className="flex flex-col gap-8">
      <Header heading="Welcome!" desc="Let's get started by creating your account.." />

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
            <label htmlFor="email" className="font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your@email.com"
              className="input-class"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-medium text-sm">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="62xxxxxxxxxx"
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
            <Button
              label="Create account"
              type="primary"
              isLink={true}
              href="/base-profile"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;
