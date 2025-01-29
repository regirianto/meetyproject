import Header from "../../../components/Header";
import { cameraIcon, PlusIcon } from "../../../assets/img/icons";
import { useRef, useState } from "react";
import Button from "../../../components/Button";

const PhotoProfile = () => {
  const numInputFile = 6;
  const fileInputRef = useRef([]);
  const [files, setFiles] = useState(Array(numInputFile).fill(null));

  const handleButtonPhoto = (index) => {
    if (fileInputRef.current[index]) {
      fileInputRef.current[index].click();
    }
  };

  const handleChange = (index, e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      console.log(`Selected file for input ${index}`, selectedFile);

      // Update the file state
      setFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles[index] = URL.createObjectURL(selectedFile);
        return newFiles;
      });
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
              isLink={true}
              href="/home"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default PhotoProfile;
