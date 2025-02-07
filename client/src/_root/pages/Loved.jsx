import { ChatIcon } from "../../assets/img/icons";
import { useEffect, useState } from "react";
import { getLikedYou, getYouLiked } from "../../api";

const Loved = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("likedYou");
  const [likedYou, setLikedYou] = useState([]);
  const [youLiked, setYouLiked] = useState([]);

  // Fetch "liked You" & "You Liked"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const likedYouRes = await getLikedYou(user.id);
        const youLikedRes = await getYouLiked(user.id);
        setLikedYou(likedYouRes.data);
        setYouLiked(youLikedRes.data);
      } catch (error) {
        console.error("❌ Error fetching liked lists:", error);
      }
    };

    fetchData();
  }, [user.id]);

  return (
    <main className="mt-4">
      {/* Tabs */}
      <div className="w-full flex justify-between tracking-tight">
        <div className="w-1/2">
          <button
            className={`w-full py-3 ${
              activeTab === "likedYou"
                ? "border-b-2 border-text"
                : "text-neutral-400"
            }  cursor-pointer`}
            onClick={() => setActiveTab("likedYou")}
          >
            Like You ({likedYou.length})
          </button>
        </div>
        <div className="w-1/2">
          <button
            className={`w-full py-3 ${
              activeTab === "youLiked"
                ? "border-b-2 border-text"
                : "text-neutral-400"
            }  cursor-pointer`}
            onClick={() => setActiveTab("youLiked")}
          >
            You Like ({youLiked.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === "likedYou" && (
        <div className="w-full grid grid-cols-2 gap-3 mt-6">
          {likedYou.length > 0 ? (
            likedYou.map((profile) => (
              <div
                key={profile.profile_id}
                className="w-full h-[200px] rounded-xl overflow-hidden relative"
              >
                <img
                  src={profile.photo_profile || "/default-profile.png"}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black from-60% flex justify-between items-end p-4">
                  <div className="text-white flex flex-col gap-1">
                    <h4 className="font-medium">{profile.name} 24</h4>
                    <p className="text-[8px] text-neutral-200 italic">
                      “{profile.bio}”
                    </p>
                  </div>
                  <div>
                    <button className="bg-tertiary p-2 rounded-full">
                      <ChatIcon color="#267F53" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No one liked you yet 😢</p>
          )}
        </div>
      )}

      {activeTab === "youLiked" && (
        <div className="w-full grid grid-cols-2 gap-3 mt-6">
          {youLiked.length > 0 ? (
            youLiked.map((profile) => (
              <div
                key={profile.profile_id}
                className="w-full h-[200px] rounded-xl overflow-hidden relative"
              >
                <img
                  src={profile.photo_profile || "/default-profile.png"}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black from-60% flex justify-between items-end p-4">
                  <div className="text-white flex flex-col gap-1">
                    <h4 className="font-medium">{profile.name} 24</h4>
                    <p className="text-[8px] text-neutral-200 italic">
                      “{profile.bio}”
                    </p>
                  </div>
                  <div>
                    <button className="bg-tertiary p-2 rounded-full">
                      <ChatIcon color="#267F53" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You haven&apos;t liked anyone yet 😅
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default Loved;
