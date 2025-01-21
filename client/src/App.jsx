import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./_root/pages/Welcome";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
