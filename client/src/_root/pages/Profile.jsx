import { useEffect, useState } from "react";
import EditIcon from "../../assets/img/icons/EditIcon";
import Line from "../../components/Line";
import { getUserProfile } from "../../api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile(user.id);
        setProfile(res.data);
      } catch (error) {
        console.error("❌ Error fetching profile: ", error);
      }
    };
    fetchProfile();
  }, [user.id]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <main className="mt-10 w-full h-full overflow-y-auto">
      <div className="w-full flex flex-col items-center gap-3">
        {/* Photo Profile */}
        <div className="bg-white rounded-full p-2 border-4 border-primary">
          <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center">
            {/* Profile picture */}
            {profile.photo_profile && (
              <img
                src={profile.photo_profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        {/* Name */}
        <div className="flex flex-col items-center tracking-tighter gap-0.5 relative">
          <h2 className="font-semibold text-2xl">
            {profile.name}, {profile.age}
          </h2>
          <p className="text-text">
            {profile.bio || <span className="italic text-sm">Add bio</span>}
          </p>
          <div className="absolute -top-2 -right-7 cursor-pointer">
            <button type="button" onClick={() => navigate("/edit-profile")}>
              <EditIcon color="#267F53" size={20} />
            </button>
          </div>
        </div>
        {/* Loved & Be Loved */}
        <div className="flex gap-10 tracking-tight mt-4">
          <div className="flex flex-col items-center gap-1">
            <h4 className="text-[#F146DD] font-medium">5</h4>
            <p className="text-sm">Liked You</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h4 className="text-[#F17146] font-medium">11</h4>
            <p className="text-sm">You Liked</p>
          </div>
        </div>
      </div>
      {/* Detail Profile */}
      <div className="bg-tertiary mt-6 py-6 px-6 w-full rounded-md">
        <div className="max-w-2xl mx-auto mb-4">
          <h4 className="font-medium text-sm">About me</h4>
          <p className="text-xs text-text leading-relaxed mt-2">
            {profile.about || <span className="italic text-sm">Add bio</span>}
          </p>
        </div>
        <Line />
        <div className="max-w-2xl mx-auto my-4">
          <h4 className="font-medium text-sm mb-4">Interest</h4>
          <div className="flex gap-2 flex-wrap">
            {profile.interests.length > 0 ? (
              profile.interests.map((interest) => (
                <div
                  key={interest.id}
                  className="bg-tertiary text-primary font-normal w-max py-[4.5px] px-3 rounded-full border-[1px] border-primary text-[11.25px]"
                >
                  {interest.interest_name}
                </div>
              ))
            ) : (
              <p>No interests selected</p>
            )}
          </div>
        </div>
        <Line />
        <div className="max-w-2xl mx-auto my-4">
          <h4 className="font-medium text-sm">Gallery</h4>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {profile.gallery.length > 0 ? (
              profile.gallery.map((photo, index) => (
                <div
                  key={index}
                  className="w-full h-[100px] bg-gray-300 rounded-md overflow-hidden"
                >
                  <img
                    src={photo}
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <p>No photos uploaded</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
