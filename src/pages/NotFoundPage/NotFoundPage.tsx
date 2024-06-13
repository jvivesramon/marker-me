import { NavLink } from "react-router-dom";
import "./NotFoundPageStyled.scss";
import paths from "../../routers/paths/paths";

const NotFoundPage = (): React.ReactElement => {
  return (
    <section className="container">
      <div className="feedback">
        <span className="feedback__error">404</span>
        <h1 className="feedback__message">page not found</h1>
      </div>
      <NavLink
        className="home"
        to={paths.markers}
        title="back home"
        aria-label="back home"
      >
        BACK HOME
      </NavLink>
    </section>
  );
};

export default NotFoundPage;
