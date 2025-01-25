/* eslint-disable react/prop-types */
const Header = ({ heading, desc, icon }) => {
  return (
    <div className="flex flex-col gap-1 text-primary">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold">{heading}</h2>
        <img src={icon} className="-mt-2" />
      </div>
      <p className="text-sm font-light leading-6">{desc}</p>
    </div>
  );
};

export default Header;
