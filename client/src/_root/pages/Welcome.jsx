import Button from "../../components/Button";
import ViewportHeight from "../../hook/ViewportHeight";
import logo from "/img/logo-white.svg";

const Welcome = () => {
  ViewportHeight();

  // bg-gradient-to-b from-primary from-50% to-secondary to-100%

  return (
    <main className="main-container bg-primary">
      <div className="h-2/3 flex justify-center items-center text-white">
        <div className="flex flex-col items-center gap-6 text-center">
          <img src={logo} alt="logo" className="w-16" />
          <p className="text-xl font-light tracking-tight">
            <span className="font-semibold">Find</span> friends and <br />
            <span className="font-semibold">Love</span> nearby
          </p>
        </div>
      </div>
      <div className="h-1/3 flex flex-col gap-6">
        <div className="text-white text-xs text-center px-6 leading-5">
          <p>
            By tapping &rdquo;Sign In&rdquo;, you aggree to our Terms Learn how
            we process your data in our Privacy Policy and Cookies Policy.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            label="Create account"
            type="primary"
            isLink={true}
            href="/sign-up"
          />
          <Button
            label="Sign in"
            type="secondary"
            isLink={true}
            href="/sign-in"
          />
        </div>
      </div>
    </main>
  );
};

export default Welcome;
