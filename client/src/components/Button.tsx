interface ButtonProps {
  label: string;
  bgColor?: string;
  isLink: boolean;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ label, bgColor, isLink, href }) => {
  const classes = `${
    bgColor == "primary text-white" ? "bg-green-primary" : "bg-white text-black"
  } font-semibold text-sm w-full py-[10px] rounded-[7px]`;

  return isLink ? (
    <a href={href} className={classes}>
      {label}
    </a>
  ) : (
    <button className={classes}>{label}</button>
  );
};

export default Button;
