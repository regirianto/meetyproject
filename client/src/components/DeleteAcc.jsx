/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteAcc = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/api/delete-account/${user.id}`);
        alert(response.data.message); // Show success message
        localStorage.removeItem("user"); // Remove user data from local storage
        navigate("/sign-in");
      } catch (error) {
        console.error("❌ Error deleting account:", error);
        alert("There was an error deleting your account. Please try again.");
      }
    }
  };

  return <button onClick={handleDeleteAccount}>{children}</button>;
};

export default DeleteAcc;
