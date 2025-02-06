/* eslint-disable react/prop-types */
const LabelInput = ({
  labelFor,
  label,
  addClasses,
  icon,
  textSize = "text-[13px]",
}) => {
  const classes = `${textSize} ${addClasses} flex gap-2 items-center tracking-tight`;

  return (
    <label htmlFor={labelFor} className={classes}>
      {icon} {label}
    </label>
  );
};

export default LabelInput;
