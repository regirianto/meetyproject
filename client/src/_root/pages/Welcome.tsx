import Button from "../../components/Button";

const Welcome = () => {
  return (
    <main className="gradient-primary w-full h-screen flex justify-center pt-40 text-white">
      <div>
        <div className="flex flex-col justify-center items-center gap-[25px]">
          <img src="/img/logo-welcome.svg" alt="logo" />
          <div className="text-center text-xl font-light">
            <h2>
              <span className="font-semibold">Find</span> friends and
            </h2>
            <h2 className="mt-1">
              <span className="font-semibold">Love</span> nearby
            </h2>
          </div>
        </div>
        <div className="absolute left-10 right-10 bottom-10 text-center">
          <p className="text-xs leading-5 mb-7 font-light">
            By tapping “Sign in”, you agree to our Terms.
            <br />
            Learn how we process your data in our <br /> Privacy Policy and
            Cookies Policy.
          </p>
          <div className="flex flex-col gap-4">
            <Button label="Create account" isLink={true} href="/sign-up" />
            <Button label="Sign in" isLink={true} href="/sign-in" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
