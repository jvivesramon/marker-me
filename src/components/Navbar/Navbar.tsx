import { Link } from "react-router-dom";
import "./NavbarStyles.scss";

const Navbar = (): React.ReactElement => {
  return (
    <nav className="navbar-container">
      <div className="navbar-container__icons">
        <Link to={""} className="navbar-container__home-icon">
          <img
            src="/images/navbar/markme-logo.svg"
            alt="MarkMe logo"
            width="192"
            height="29"
          />
        </Link>
        <Link to={""} className="navbar-container__shopping-cart-button">
          <img
            src="/images/navbar/shopping-cart-icon.svg"
            alt="Shopping card button"
            height="45"
            width="39"
          />
        </Link>
      </div>
      <span className="navbar-container__divider"></span>
    </nav>
  );
};

export default Navbar;
