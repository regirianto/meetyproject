/* eslint-disable react/prop-types */
const Button = ({ label, type, isLink, href }) => {
  const classes = `${
    type == "primary"
      ? "bg-primary text-white"
      : type == "secondary"
      ? "bg-white text-black"
      : type == "outline"
      ? "bg-transparent text-white border-[1px] border-white"
      : ""
  }  w-full h-[52px] flex justify-center items-center text-base font-semibold rounded-md`;

  if (isLink === true) {
    return (
      <a href={href} className={classes}>
        {label}
      </a>
    );
  } else {
    return (
      <button className={classes} type="submit">
        {label}
      </button>
    );
  }
};

export default Button;
