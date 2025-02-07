import { useEffect, useState } from "react";
import { getChats } from "../../api";
import { useNavigate } from "react-router-dom";
import Photo from "../../assets/img/image-test.png"

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
      {chats.length === 0 ? (
        <p className="text-center text-gray-500"></p>
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

      <div className="w-full flex flex-col tracking-tight">
        <div className="flex justify-between items-end py-3 border-b-[1px] border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={Photo} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-medium">Anna</h4>
              <p className="text-neutral-700 text-sm">Nice to meet you</p>
            </div>
          </div>
          <div className="pb-2">
            <p className="text-neutral-700 text-xs">13.42</p>
          </div>
        </div>
        <div className="flex justify-between items-end py-3 border-b-[1px] border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={Photo} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-medium">Anna</h4>
              <p className="text-neutral-700 text-sm">Nice to meet you</p>
            </div>
          </div>
          <div className="pb-2">
            <p className="text-neutral-700 text-xs">13.42</p>
          </div>
        </div>
        <div className="flex justify-between items-end py-3 border-b-[1px] border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={Photo} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-medium">Anna</h4>
              <p className="text-neutral-700 text-sm">Nice to meet you</p>
            </div>
          </div>
          <div className="pb-2">
            <p className="text-neutral-700 text-xs">13.42</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatList;
