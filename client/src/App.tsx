import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import SignInForm from "./_auth/form/SignInForm";
import SignUpForm from "./_auth/form/SignUpForm";
import RootLayout from "./_root/RootLayout";
import { Home, Welcome } from "./_root/pages";

const App = () => {
  return (
    <main>
      <Routes>
        {/* Welcome page */}
        <Route path="/welcome" element={<Welcome />} />

        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
