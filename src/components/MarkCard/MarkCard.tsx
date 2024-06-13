import { Link } from "react-router-dom";
import "./MarkCardStyles.scss";
import paths from "../../routers/paths/paths";
import { Product } from "../../entities/markers/types";
import Button from "../Button/Button";

interface MarkCardProps {
  markProps: Product;
  isLazy?: "lazy" | "eager";
}

const MarkCard = ({
  markProps: { shortDescription, name, price, image, id },
  isLazy,
}: MarkCardProps): React.ReactElement => {
  return (
    <article className="mark">
      <Button
        classname="shopping-cart"
        image={
          <img
            className="shopping-cart--image"
            src="/images/markCard/shopping-cart.svg"
            alt="Shopping cart icon"
          />
        }
      />
      <Link to={`${paths.markers}/${id}`}>
        <div className="mark__container">
          <img
            className="mark__container--image"
            src={image.big}
            alt={`${name} mark`}
            width="286"
            height="173"
            loading={isLazy}
          />
        </div>
        <h2 className="mark__name">{name}</h2>
        <p className="mark__description">{shortDescription}</p>
        <span className="mark__price">{`${price} €`}</span>
      </Link>
    </article>
  );
};

export default MarkCard;
