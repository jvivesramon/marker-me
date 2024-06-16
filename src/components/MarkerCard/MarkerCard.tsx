import { Link } from "react-router-dom";
import "./MarkerCardStyles.scss";
import paths from "../../routers/paths/paths";
import { Marker } from "../../entities/markers/types";
import Button from "../Button/Button";

interface MarkCardProps {
  markProps: Marker;
  isLazy?: "lazy" | "eager";
}

const MarkCard = ({
  markProps: { shortDescription, name, price, image, id },
  isLazy,
}: MarkCardProps): React.ReactElement => {
  return (
    <article className="marker-container">
      <Link to={`${paths.markers}/${id}`}>
        <Button
          classname="shopping-cart"
          image={
            <img
              className="shopping-cart--image"
              src="/images/markerCard/shopping-cart.svg"
              alt="Shopping cart icon"
            />
          }
        />
        <div className="marker-container__info">
          <img
            className="marker-container__info--image"
            src={image.small}
            alt={`${name} marker`}
            width="286"
            height="173"
            loading={isLazy}
          />
        </div>
        <h2 className="marker-container__name">{name}</h2>
        <p className="marker-container__description">{shortDescription}</p>
        <span className="marker-container__price">{`${price} €`}</span>
      </Link>
    </article>
  );
};

export default MarkCard;
