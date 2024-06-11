import { Outlet } from "react-router-dom";
import "../shared/ContainerShared.scss";
import Navbar from "../Navbar/Navbar";

const Layout = (): React.ReactElement => {
  return (
    <>
      <Navbar />
      <div className="container-shared">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
