/* eslint-disable react/prop-types */

const ThemeIcon = ({ color = "#0F172A", size = 16, style }) => {
  return (
    <div className={`flex items-center ${style}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 16C12.4184 16 16 12.4184 16 8C16 3.5816 12.4184 0 8 0C3.5816 0 0 3.5816 0 8C0 12.4184 3.5816 16 8 16ZM8 14.8V1.2C9.80347 1.2 11.5331 1.91643 12.8083 3.19167C14.0836 4.46692 14.8 6.19653 14.8 8C14.8 9.80347 14.0836 11.5331 12.8083 12.8083C11.5331 14.0836 9.80347 14.8 8 14.8Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default ThemeIcon;
