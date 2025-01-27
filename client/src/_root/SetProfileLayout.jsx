import { Outlet, useNavigate } from "react-router-dom";
import arrowLeft from "../assets/img/icons/arrow-left.svg";
import Button from "../components/Button";
import ViewportHeight from "../hook/ViewportHeight";

const SetProfileLayout = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  ViewportHeight();

  return (
    <main className="main-container">
      <div className="fixed top-4">
        <Button
          onClick={handleBack}
          addClasses="border-[1px] h-10 px-2"
          label={<img src={arrowLeft} alt="left-arrow" className="w-8" />}
          type="secondary"
          isLink={false}
        />
      </div>
      <Outlet />
    </main>
  );
};

export default SetProfileLayout;
