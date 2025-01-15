import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="main-container">
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
