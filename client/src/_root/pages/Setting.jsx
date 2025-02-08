import ChevronRightIcon from "../../assets/img/icons/ChevronRightIcon";
import LogoutIcon from "../../assets/img/icons/LogoutIcon";
import { useNavigate } from "react-router-dom";
import SettingItem from "../../components/SettingItem";
import UpdateIcon from "../../assets/img/icons/UpdateIcon";
import LanguageIcon from "../../assets/img/icons/LanguageIcon";
import ThemeIcon from "../../assets/img/icons/ThemeIcon";
import AboutIcon from "../../assets/img/icons/AboutIcon";
import NotificationIcon from "../../assets/img/icons/NotificationIcon";
import PrivacyIcon from "../../assets/img/icons/PrivacyIcon";
import SecurityIcon from "../../assets/img/icons/SecurityIcon";
import HelpIcon from "../../assets/img/icons/HelpIcon";

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
      <div className="flex flex-col px-4">
        <h1 className="font-semibold mb-2 text-lg">Application</h1>
        <SettingItem
          icon={UpdateIcon}
          label="App Update"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={LanguageIcon}
          label="Language"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={ThemeIcon}
          label="Theme"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={AboutIcon}
          label="About"
          rightIcon={ChevronRightIcon}
        />

        <h1 className="font-semibold mt-4 mb-2 text-lg">Account & Security</h1>
        <SettingItem
          icon={PrivacyIcon}
          label="Privacy"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={NotificationIcon}
          label="Notification"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={SecurityIcon}
          label="Security"
          rightIcon={ChevronRightIcon}
        />
        <SettingItem
          icon={HelpIcon}
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
