import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className="main-container">
      <Outlet />
    </main>
  );
};

export default RootLayout;
