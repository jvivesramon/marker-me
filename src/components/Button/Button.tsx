interface ButtonProps {
  text?: string;
  image?: React.ReactElement;
  classname: string;
  actionOnClick?: () => void;
  disabled?: boolean;
  children?: React.ReactElement;
  title?: string;
  ariaLabel?: string;
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
}: ButtonProps): React.ReactElement => {
  return (
    <button
      className={classname}
      title={title}
      aria-label={ariaLabel}
      onClick={actionOnClick}
      disabled={disabled}
    >
      {text}
      {image}
      {children}
    </button>
  );
};

export default Button;
