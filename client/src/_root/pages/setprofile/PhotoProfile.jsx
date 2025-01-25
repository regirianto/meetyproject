import Header from "../../../components/Header";
import { cameraIcon } from "../../../assets/img/icons";

const PhotoProfile = () => {
  return (
    <main className="template-parent-box">
      <Header
        heading="Show yourself off!"
        icon={cameraIcon}
        desc="Upload a photo to make your profile stand out and attract the right connections."
      />

      {/* Photo box */}
      <div></div>
    </main>
  );
};

export default PhotoProfile;
