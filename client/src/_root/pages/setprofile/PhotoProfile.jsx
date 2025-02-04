import Header from "../../../components/Header";
import { cameraIcon, PlusIcon } from "../../../assets/img/icons";
import { useRef, useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { uploadPhotoProfile } from "../../../api";

const PhotoProfile = () => {
  const numInputFile = 6;
  const fileInputRef = useRef([]);
  const [files, setFiles] = useState(Array(numInputFile).fill(null));
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();
  const profileId = localStorage.getItem("profileId");

  const handleButtonPhoto = (index) => {
    if (fileInputRef.current[index]) {
      fileInputRef.current[index].click();
    }
  };

  const handleChange = (index, e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Update the file previews
      setFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles[index] = URL.createObjectURL(selectedFile);
        return newFiles;
      });

      // Update the selected files
      setSelectedFiles((prevSelected) => {
        const newSelected = [...prevSelected];
        newSelected[index] = selectedFile;
        return newSelected;
      });
    }
  };

  const handleRemove = (index) => {
    // Remove from preview
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = null;
      return newFiles;
    });

    // Remove from actual selected
    setSelectedFiles((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = null;
      return newSelected;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profileId) {
      alert("Profile ID is missing");
      return;
    }

    if (selectedFiles.filter(Boolean).length === 0) {
      alert("Please select at least one photo");
      return;
    }

    const formData = new FormData();
    formData.append("profileId", profileId);
    selectedFiles.forEach((file) => {
      if (file) formData.append("photos", file);
    });

    try {
      await uploadPhotoProfile(formData);
      alert("Photo uploaded");
      navigate("/home");
    } catch (error) {
      console.error("API Error: ", error.response?.data || error);
    }
  };

  return (
    <main className="template-parent-box">
      <Header
        heading="Show yourself off!"
        icon={cameraIcon}
        desc="Upload a photo to make your profile stand out and attract the right connections."
      />

      {/* Photo box */}
      <div>
        <form>
          <div className="grid grid-flow-row grid-cols-3 gap-[10px] w-full">
            {Array.from({ length: numInputFile }, (_, index) => (
              <div
                key={index}
                className="bg-tertiary border-2 border-primary border-dashed rounded-md overflow-hidden aspect-square flex justify-center items-center"
              >
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow-md hover:bg-red-500 hover:text-white transition"
                >
                  ❌
                </button>

                {/* Preview Box */}
                <button onClick={() => handleButtonPhoto(index)} type="button">
                  {/* Show PlusIcon when no file is selected */}
                  {!files[index] && <PlusIcon color="#267F53" size={48} />}
                </button>
                {/* Show image preview when a file is selected */}
                {files[index] && (
                  <img
                    src={files[index]}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                )}

                <input
                  type="file"
                  ref={(e) => (fileInputRef.current[index] = e)}
                  onChange={(e) => handleChange(index, e)}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            ))}
          </div>

          <div className="button-box-next">
            <Button
              label="Next"
              type="primary"
              isLink={false}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default PhotoProfile;
