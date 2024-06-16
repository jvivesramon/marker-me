import { ShoppingCart } from "../../entities/markers/types";
import "./ShoppingCartCardStyles.scss";
import Button from "../Button/Button";

interface ShoppingCartCardProps {
  color: string;
  total: number;
  markProps: ShoppingCart;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  onDelete: (id: number) => void;
}

const ShoppingCartCard = ({
  markProps,
  total,
  onAdd,
  onDelete,
  onRemove,
  color,
}: ShoppingCartCardProps): React.ReactElement => {
  return (
    <div className="shopping-cart-card__container">
      <div className="shopping-cart-card__container--description">
        <img
          src={markProps.image.small}
          alt={markProps.name}
          className="shopping-cart-card__container--image"
        />
        <p>{`${markProps.name} - ${markProps.shortDescription} - ${color}`}</p>
      </div>
      <p className="shopping-cart-card__container--price">{markProps.price}€</p>
      <div className="shopping-cart-card__container--total">
        <button onClick={() => onAdd(markProps.id)}>+</button>
        <span>{total}</span>
        <button onClick={() => onRemove(markProps.id)}>-</button>
      </div>
      <p className="shopping-cart-card__container--subtotal">
        {(total * Number(markProps.price)).toFixed(2)}€
      </p>
      <Button
        classname="shopping-cart-card__container--delete"
        actionOnClick={() => onDelete(markProps.id)}
      >
        <img src="images/shoppingCart/shopping-trash.svg" alt="" />
      </Button>
    </div>
  );
};

export default ShoppingCartCard;
