import Button from "../../components/Button";
import logo from "/img/logo-welcome.svg";

const Welcome = () => {
  return (
    <main className="gradient-primary w-full h-screen flex justify-center pt-52 text-white">
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
        <div className="absolute left-10 right-10 bottom-14 text-center">
          <p className="text-[10px] leading-[18px] mb-7">
            By tapping “Sign in”, you agree to our Terms.
            <br />
            Learn how we process your data in our <br /> Privacy Policy and
            Cookies Policy.
          </p>
          <div className="flex flex-col gap-4">
            <Button label="Create account" />
            <Button label="Sign in" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
