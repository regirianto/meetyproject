import { useEffect, useState } from "react";
import { getChats } from "../../api";

const ChatList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // const navigate = useNavigate();/
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
    <main className="mt-4 flex h-[60vh] items-center justify-center">
      <h1 className="italic text-neutral-700 tracking-tight text-lg">no converstions yet</h1>
    </main>
  );
};

export default ChatList;
