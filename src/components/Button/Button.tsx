import { CSSProperties } from "react";

interface ButtonProps {
  text?: string;
  image?: React.ReactElement;
  classname: string;
  actionOnClick?: () => void;
  disabled?: boolean;
  children?: React.ReactElement;
  title?: string;
  ariaLabel?: string;
  style?: CSSProperties;
}

const Button = ({
  text,
  image,
  classname,
  actionOnClick,
  disabled,
  title,
  ariaLabel,
  children,
  style,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      className={classname}
      title={title}
      aria-label={ariaLabel}
      onClick={actionOnClick}
      disabled={disabled}
      style={style}
    >
      {text}
      {image}
      {children}
    </button>
  );
};

export default Button;
