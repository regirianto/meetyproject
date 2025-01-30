import { Outlet } from "react-router-dom";
import logo from "../assets/img/logo-horizontal.svg";
import { menuList } from "../constant";

const RootLayout = () => {
  return (
    <main className="app-container">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className="w-36">
          <h4 className="font-secondary w-full uppercase text-right text-primary font-bold">
            find what you&apos;re searching for
          </h4>
        </div>
      </div>

      {/* Content */}
      <Outlet />

      {/* Menu bar */}
      <div>
        <ul className="flex justify-between items-center">
          {menuList.map((item) => (
            <li key={item.id}>
              <button
                className="flex flex-col gap-2 items-center"
                type="button"
              >
                <span className="text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default RootLayout;
