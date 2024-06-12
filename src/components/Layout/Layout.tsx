import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../shared/ContainerShared.scss";
import Navbar from "../Navbar/Navbar";

const Layout = (): React.ReactElement => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container-shared">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
