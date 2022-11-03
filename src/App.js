import "./App.css";
import {
  HomePage,
  ProfilePage,
  RegisterPage,
  LoginPage,
  ErrorPage,
  ForgetPage,
  OffersPage,
} from "./pages/index";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <section className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </section>
  );
}

export default App;
