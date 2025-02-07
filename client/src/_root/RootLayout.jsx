import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-horizontal.svg";
import { menuList, pageHeadings } from "../constant";

const RootLayout = () => {
  // Log out function
  const navigate = useNavigate();

  // Menu bar active
  const location = useLocation();

  // Heading Text
  const headingText = pageHeadings[location.pathname] || "Welcome!";

  return (
    <main className="app-container flex flex-col h-screen">
      {/* Heading */}
      <div className="flex justify-between items-center z-50">
        <div>
          <img src={logo} alt="logo" />
        </div>

        <div className="w-36">
          <h4 className="font-secondary w-full uppercase text-right text-primary font-bold">
            {headingText}
          </h4>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto w-full h-full pb-20">
        <Outlet />
      </div>

      {/* Menu bar */}
      <div className="fixed left-0 right-0 bottom-0 px-2 py-4 border-t-2 bg-white">
        <ul className="flex justify-between items-center gap-1">
          {menuList.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <li key={item.id} className="w-1/5 flex justify-center">
                <button
                  className="flex flex-col items-center h-14 justify-between"
                  type="button"
                  onClick={() => navigate(`/${item.path}`)}
                >
                  <item.icon
                    size={28}
                    color={`${isActive ? "#267F53" : "#0F172A"}`}
                  />
                  <span
                    className={`text-sm ${
                      isActive ? "text-primary" : "text-black"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default RootLayout;
