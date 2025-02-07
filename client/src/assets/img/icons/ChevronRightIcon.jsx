/* eslint-disable react/prop-types */

const ChevronRightIcon = ({ color = "#0F172A", size = 16, style }) => {
  return (
    <div className={`flex items-center ${style}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        width={size}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
};

export default ChevronRightIcon;
