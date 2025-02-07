import ChevronRightIcon from "../../assets/img/icons/ChevronRightIcon";
import KeyIcon from "../../assets/img/icons/KeyIcon";
import TrashIcon from "../../assets/img/icons/TrashIcon";
import LogoutIcon from "../../assets/img/icons/LogoutIcon";
import { useNavigate } from "react-router-dom";
import SettingItem from "../../components/SettingItem";

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
        <h1 className="font-semibold mb-2 text-lg">Application</h1>
        <SettingItem
          icon={KeyIcon}
          label="App Update"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={KeyIcon}
          label="Language"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={KeyIcon}
          label="Theme"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={KeyIcon}
          label="About"
          rightIcon={ChevronRightIcon}
        />

        <h1 className="font-semibold mt-4 mb-2 text-lg">Account & Security</h1>
        <SettingItem
          icon={TrashIcon}
          label="Privacy"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={TrashIcon}
          label="Notification"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={TrashIcon}
          label="Security"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={TrashIcon}
          label="Help & Support"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={LogoutIcon}
          label="Log out"
          rightIcon={ChevronRightIcon}
          onClick={handleLogout}
        />
      </div>
    </main>
  );
};

export default Setting;
