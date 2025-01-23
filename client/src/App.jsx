import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./_root/pages/Welcome";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import BaseProfile from "./_root/pages/setprofile/BaseProfile";
import ActivityProfile from "./_root/pages/setprofile/ActivityProfile";
import PhotoProfile from "./_root/pages/setprofile/PhotoProfile";
import AuthLayout from "./_auth/AuthLayout";
import SignUpForm from "./_auth/form/SignUpForm";
import SignInForm from "./_auth/form/SignInForm";
import SetProfileLayout from "./_root/SetProfileLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/" element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Route>

        <Route path="/" element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/" element={<SetProfileLayout />}>
          <Route path="/base-profile" element={<BaseProfile />} />
          <Route path="/activity" element={<ActivityProfile />} />
          <Route path="/set-photo" element={<PhotoProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
