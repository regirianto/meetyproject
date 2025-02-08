/* eslint-disable react/prop-types */

const SecurityIcon = ({ color = "#0F172A", size = 16, style }) => {
  return (
    <div className={`flex items-center ${style}`}>
      <svg
        width={size}
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 17.999C5.70362 17.3985 3.79619 16.1738 2.27771 14.3247C0.759238 12.4757 0 10.3922 0 8.07414V2.63167L8 0L16 2.63167V8.07414C16 10.3915 15.2408 12.4747 13.7223 14.3237C12.2038 16.1728 10.2964 17.3972 8 17.999ZM8 16.9312C9.84762 16.428 11.3905 15.4344 12.6286 13.9504C13.8667 12.4663 14.5905 10.8095 14.8 8.97987H8V1.0738L1.14286 3.31902V8.50788C1.14286 8.63804 1.16191 8.79537 1.2 8.97987H8V16.9312Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default SecurityIcon;
