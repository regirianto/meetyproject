import Button from "../../components/Button";
import logo from "/img/logo-welcome.svg";

const Welcome = () => {
  return (
    <main className="gradient-primary w-full h-screen flex justify-center items-center text-white">
      <div>
        <div className="flex flex-col justify-center items-center gap-[25px]">
          <img src={logo} alt="logo" />
          <div className="text-center text-xl font-light">
            <h2>
              <span className="font-semibold">Find</span> friends and
            </h2>
            <h2 className="mt-1">
              <span className="font-semibold">Love</span> nearby
            </h2>
          </div>
        </div>
        <div>
          <p>
            By tapping “Sign in”, you agree to our Terms. Learn how we process
            your data in our Privacy Policy and Cookies Policy.
          </p>
          <div>
            <Button />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
