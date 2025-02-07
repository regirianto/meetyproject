import UserIcon from "../../assets/img/icons/UserIcon";
import ChevronRightIcon from "../../assets/img/icons/ChevronRightIcon";
import KeyIcon from "../../assets/img/icons/KeyIcon";
import TrashIcon from "../../assets/img/icons/TrashIcon";
import LogoutIcon from "../../assets/img/icons/LogoutIcon";
import { useNavigate } from "react-router-dom";
import DeleteAcc from "../../components/DeleteAcc";

const Setting = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileId");
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <main className="mt-4 tracking-tight">
      <div className="flex flex-col">
        <div className="flex justify-between items-center py-4 border-b-[1px] border-neutral-200">
          <div className="w-2/3 flex gap-4">
            <UserIcon color="#267F53" size={20} />
            <button className="">Personal Information</button>
          </div>
          <div className="w-1/3 flex justify-end">
            <ChevronRightIcon color="#267F53" />
          </div>
        </div>
        <div className="flex justify-between items-center py-4 border-b-[1px] border-neutral-200">
          <div className="w-2/3 flex gap-4">
            <KeyIcon color="#267F53" size={20} />
            <button className="">Change Password</button>
          </div>
          <div className="w-1/3 flex justify-end">
            <ChevronRightIcon color="#267F53" />
          </div>
        </div>
        <div className="flex justify-between items-center py-4 border-b-[1px] border-neutral-200">
          <div className="w-2/3 flex gap-4">
            <TrashIcon color="#267F53" size={20} />
            <DeleteAcc>Delete Account</DeleteAcc>
          </div>
          <div className="w-1/3 flex justify-end">
            <ChevronRightIcon color="#267F53" />
          </div>
        </div>
        <div className="flex justify-between items-center py-4">
          <div className="w-2/3 flex gap-4">
            <LogoutIcon color="#267F53" size={20} />
              <button className="" onClick={handleLogout}>
                Log out
              </button>
          </div>
          <div className="w-1/3 flex justify-end">
            <ChevronRightIcon color="#267F53" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Setting;
