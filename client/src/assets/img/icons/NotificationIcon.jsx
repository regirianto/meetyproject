/* eslint-disable react/prop-types */

const NotificationIcon = ({ color = "#0F172A", size = 16, style }) => {
  return (
    <div className={`flex items-center ${style}`}>
      <svg
        width={size}
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.02369 11.216C0.85553 12.3312 1.60632 13.1048 2.52527 13.4904C6.04869 14.9704 10.9513 14.9704 14.4747 13.4904C15.3937 13.1048 16.1445 12.3304 15.9763 11.216C15.8737 10.5304 15.3629 9.96 14.9847 9.4024C14.4897 8.6632 14.4408 7.8576 14.44 7C14.4408 3.6864 11.7818 1 8.5 1C5.21816 1 2.55921 3.6864 2.55921 7C2.55921 7.8576 2.51027 8.664 2.01448 9.4024C1.63711 9.96 1.12711 10.5304 1.02369 11.216Z"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.3421 14.6001C5.70368 15.9801 6.98105 17.0001 8.5 17.0001C10.0197 17.0001 11.2955 15.9801 11.6579 14.6001"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default NotificationIcon;
