import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./_root/pages/Welcome";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import AuthLayout from "./_auth/AuthLayout";
import SignUpForm from "./_auth/form/SignUpForm";
import SignInForm from "./_auth/form/SignInForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/" element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
