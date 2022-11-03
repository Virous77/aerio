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
import Navbar from "./components/layouts/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <section className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </section>
  );
}

export default App;
