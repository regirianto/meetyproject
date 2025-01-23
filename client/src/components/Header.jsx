/* eslint-disable react/prop-types */
const Header = ({ heading, desc }) => {
  return (
    <div className="flex flex-col gap-1 text-primary">
      <h2 className="text-2xl font-semibold">{heading}</h2>
      <p className="text-sm font-light leading-6">
        {desc}
      </p>
    </div>
  );
};

export default Header;
