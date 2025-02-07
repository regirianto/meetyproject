import { useEffect, useState } from "react";
import { getChats } from "../../api";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await getChats(user.id);
        setChats(res.data);
        console.log("📸 Chat List Data:", res.data); // ✅ Debugging
      } catch (error) {
        console.error("❌ Error fetching conversations:", error);
      }
    };
    fetchChats();
  }, [user.id]);

  return (
    <main className="mt-4">
      <h2 className="text-center text-xl font-bold">Chats</h2>
      {chats.length === 0 ? (
        <p className="text-center text-gray-500">
          No chats yet. Start a conversation from Loved Page.
        </p>
      ) : (
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.conversation_id}
              className="chat-item flex items-center gap-3 p-4 border-b cursor-pointer"
              onClick={() => navigate(`/chat/${chat.conversation_id}`)}
            >
              {/* ✅ Debugging */}
              <img
                src={chat.photo_profile || "/default-profile.png"} // ✅ Ensure it displays
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => (e.target.src = "/default-profile.png")} // ✅ Fallback if broken image
              />
              <div>
                <h3 className="font-medium">{chat.name}</h3>
                <p className="text-sm text-gray-500">
                  {chat.last_message || "No messages yet"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ChatList;
