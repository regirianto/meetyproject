/* eslint-disable react/prop-types */
import { ChatIcon } from "../assets/img/icons";

const ProfileList = ({ profiles, handleStartChat, message }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-3 mt-6">
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <div
            key={profile.id}
            className="w-full h-[200px] rounded-xl overflow-hidden relative"
          >
            <img
              src={
                profile.photo_profile
                  ? `http://localhost:5000/uploads/${profile.photo_profile}`
                  : "/default-profile.png"
              }
              alt="profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black from-60% flex justify-between items-end p-4">
              <div className="text-white flex flex-col gap-1">
                <h4 className="font-medium">
                  {profile.name}, {profile.age}
                </h4>
                <p className="text-[8px] text-neutral-200 italic">
                  “{profile.bio}”
                </p>
              </div>
              <div>
                <button
                  className="bg-tertiary p-2 rounded-full"
                  onClick={() => {
                    console.log("Profile Data: ", profile);
                    handleStartChat(profile.user_id);
                  }}
                >
                  <ChatIcon color="#267F53" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">{message}</p>
      )}
    </div>
  );
};

export default ProfileList;
