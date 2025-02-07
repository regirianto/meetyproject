import ChevronRightIcon from "../assets/img/icons/ChevronRightIcon";

/* eslint-disable react/prop-types */
const SettingItem = ({ icon: Icon, label, onClick }) => {
  return (
    <div className="flex justify-between items-center py-[15px] border-b-[1px] border-neutral-200">
      <div className="w-2/3 flex gap-4">
        {Icon && <Icon color="#267F53" size={16} />}
        <button onClick={onClick} className="text-sm">
          {label}
        </button>
      </div>
      <div className="w-1/3 flex justify-end">
        <ChevronRightIcon color="#267F53" />
      </div>
    </div>
  );
};

export default SettingItem;
