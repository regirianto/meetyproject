import { useEffect, useState } from "react";
import { getLikedYou, getYouLiked, startChat } from "../../api";
import { useNavigate } from "react-router-dom";
import ProfileList from "../../components/ProfileList";

const Loved = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [activeTab, setActiveTab] = useState("likedYou");
  const [likedYou, setLikedYou] = useState([]);
  const [youLiked, setYouLiked] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch "liked You" & "You Liked"
  useEffect(() => {
    if (!user.id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [likedYouRes, youLikedRes] = await Promise.all([
          getLikedYou(user.id),
          getYouLiked(user.id),
        ]);
        setLikedYou(likedYouRes.data);
        setYouLiked(youLikedRes.data);
      } catch (error) {
        console.error("❌ Error fetching liked you & you liked:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [user?.id]);

  // ✅ Start a chat with a matched user
  const handleStartChat = async (matchedUserId) => {
    console.log("🔍 Received matchedUserId:", matchedUserId); // Debugging

    if (!matchedUserId) {
      console.error("❌ matchedUserId is undefined!");
      return;
    }

    try {
      const res = await startChat(user.id, matchedUserId);
      console.log("✅ Chat started, Conversation ID:", res.data.conversationId);

      if (res.data.conversationId) {
        navigate(`/chat/${res.data.conversationId}`);
      }
    } catch (error) {
      console.error("❌ Error starting chat:", error);
    }
  };

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

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500 mt-6">🔄 Loading...</p>
      ) : (
        <>
          {/* Like you list  */}
          {activeTab === "likedYou" && (
            <ProfileList
              profiles={likedYou}
              handleStartChat={handleStartChat}
              message="No one liked you yet 😢"
            />
          )}

          {/* You Liked List */}
          {activeTab === "youLiked" && (
            <ProfileList
              profiles={youLiked}
              handleStartChat={handleStartChat}
              message="You haven't liked anyone yet 😅"
            />
          )}
        </>
      )}
    </main>
  );
};

export default Loved;
