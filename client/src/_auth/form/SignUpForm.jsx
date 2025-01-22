import Button from "../../components/Button";
import ViewportHeight from "../../hook/ViewportHeight";

const SignUpForm = () => {
  ViewportHeight();

  return (
    <main className="bg-white text-black flex flex-col gap-8">
      <div className="flex flex-col gap-3 text-primary">
        <h2 className="text-2xl font-semibold">Welcome!</h2>
        <p className="text-sm font-light leading-6">
          Let&apos;s get started by creating your account. <br />
          Please fill in the details below to join us.
        </p>
      </div>

      {/* form */}
      <div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <label htmlFor="username" className="font-medium text-sm">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="h-12 bg-tertiary px-4 text-xs placeholder:text-xs rounded-lg border-[1px] border-neutral-300 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your@email.com"
              className="h-12 bg-tertiary px-4 text-xs placeholder:text-xs rounded-lg border-[1px] border-neutral-300 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="phone" className="font-medium text-sm">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="62xxxxxxxxxx"
              className="h-12 bg-tertiary px-4 text-xs placeholder:text-xs rounded-lg border-[1px] border-neutral-300 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="font-medium text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="h-12 bg-tertiary px-4 text-xs placeholder:text-xs rounded-lg border-[1px] border-neutral-300 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="mt-3">
            <Button label="Create account" type="primary" isLink={false} />
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;
