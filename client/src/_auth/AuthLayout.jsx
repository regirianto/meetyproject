import { Outlet, useLocation } from "react-router-dom";
import { facebookIcon, googleIcon, linkedinIcon } from "../assets/img/icons";
import Button from "../components/Button";
// import arrowLeft from "../assets/img/icons/arrow-left.svg";
import ViewportHeight from "../hook/ViewportHeight";

const AuthLayout = () => {
  // const navigate = useNavigate();
  // const handleBack = () => {
  //   navigate(-1);
  // };

  ViewportHeight();

  const location = useLocation();
  const path = location.pathname;

  return (
    <main
      className={`main-container flex flex-col ${
        path === "/sign-up"
          ? "justify-end pb-6"
          : path === "/sign-in"
          ? "justify-center"
          : null
      } bg-white text-black`}
    >
      {/* <div className="absolute top-4">
        <Button
          onClick={handleBack}
          addClasses="border-[1px] h-10 px-2"
          label={<img src={arrowLeft} alt="left-arrow" className="w-8" />}
          type="secondary"
          isLink={false}
        />
      </div> */}
      <Outlet />
      <div className="flex flex-col gap-4 mt-4 items-center">
        <p className="text-sm ">~ Or continue with ~</p>
        <div className="flex w-full justify-center items-center gap-2">
          <Button
            type="secondary"
            isLink={true}
            // label={<span className="flex font-normal text-sm gap-2 justify-center items-center"><img src={googleIcon} alt="" className="w-6" /> Google</span>}
            label={<img src={googleIcon} alt="" className="w-6" />}
            addClasses="border-[1px] w-max px-4"
          />
          <Button
            type="secondary"
            isLink={true}
            // label={<span className="flex font-normal text-sm gap-2 justify-center items-center"><img src={facebookIcon} alt="" className="w-6" /> Facebook</span>}
            label={<img src={facebookIcon} alt="" className="w-6" />}
            addClasses="border-[1px] w-max px-4"
          />
          <Button
            type="secondary"
            isLink={true}
            // label={<span className="flex font-normal text-sm gap-2 justify-center items-center"><img src={linkedinIcon} alt="" className="w-6" /> Linkedin</span>}
            label={<img src={linkedinIcon} alt="" className="w-6" />}
            addClasses="border-[1px] w-max px-4"
          />
        </div>
        {path === "/sign-up" ? (
          <div className="text-xs">
            <p>
              already have an account?{" "}
              <a href="/sign-in" className="text-blue-500 underline">
                Sign In
              </a>
            </p>
          </div>
        ) : path === "/sign-in" ? (
          <div className="text-xs">
            <p>
              don&apos;t have any account?{" "}
              <a href="/sign-up" className="text-blue-500 underline">
                Sign Up
              </a>
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default AuthLayout;
