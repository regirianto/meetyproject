/* eslint-disable react/prop-types */
const LabelInput = ({ labelFor, label, addClasses, icon }) => {
  const classes = `text-[13px] ${addClasses} flex gap-2 items-center`;

  return (
    <label htmlFor={labelFor} className={classes}>
      {icon} {label}
    </label>
  );
};

export default LabelInput;
