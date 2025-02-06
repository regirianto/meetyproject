/* eslint-disable react/prop-types */

const ModalHome = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary z-50 overflow-y-auto">
      <div className="bg-white pb-20">
        {/* Modal Content */}
        <div className="bg-blue-500">{children}</div>
      </div>
    </div>
  );
};

export default ModalHome;
