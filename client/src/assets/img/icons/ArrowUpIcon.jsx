/* eslint-disable react/prop-types */

const ArrowUpIcon = ({ color = "#0F172A", size = 16, style }) => {
  return (
    <div className={`flex items-center ${style}`}>
      <svg
        width={size}
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 14.0186C7.58579 14.0186 7.25 13.6828 7.25 13.2686L7.25 4.57921L4.03033 7.79889C3.73744 8.09178 3.26256 8.09178 2.96967 7.79889C2.67678 7.50599 2.67678 7.03112 2.96967 6.73823L7.46967 2.23823C7.76256 1.94533 8.23744 1.94533 8.53033 2.23823L13.0303 6.73822C13.3232 7.03112 13.3232 7.50599 13.0303 7.79888C12.7374 8.09178 12.2626 8.09178 11.9697 7.79888L8.75 4.57922L8.75 13.2686C8.75 13.6828 8.41421 14.0186 8 14.0186Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default ArrowUpIcon;
