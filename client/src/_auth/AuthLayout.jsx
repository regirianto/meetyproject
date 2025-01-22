import { Outlet, useNavigate } from "react-router-dom";
import { facebookIcon, googleIcon, linkedinIcon } from "../../public/img/icons";

const AuthLayout = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <main className="main-container">
      <div className="absolute top-3">
        <button onClick={handleBack}>back</button>
      </div>
      <Outlet />
      <div className="flex flex-col gap-4 mt-4 items-center">
        <p className="text-sm ">~ Or continue with ~</p>
        <div className="flex items-center gap-8">
          <button>
            <img src={googleIcon} alt="" />
          </button>
          <button>
            <img src={facebookIcon} alt="" />
          </button>
          <button>
            <img src={linkedinIcon} alt="" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
