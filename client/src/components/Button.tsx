interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <>
      <button className="bg-white font-bold text-xs text-black w-full py-[10px] rounded-[7px]">
        {label}
      </button>
    </>
  );
};

export default Button;
