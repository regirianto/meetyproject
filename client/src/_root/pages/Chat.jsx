import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessages } from "../../api";

const Chat = () => {
  const { conversationId } = useParams(); // ✅ Get the conversation ID from the URL
  const user = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);

  // ✅ Load chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getMessages(conversationId);
        setMessages(res.data);
      } catch (error) {
        console.error("❌ Error fetching chat:", error);
      }
    };
    fetchMessages();
  }, [conversationId]);

  return (
    <main className="mt-4">
      {messages.map((msg) => (
        <p
          key={msg.id}
          className={msg.sender_id === user.id ? "text-right" : "text-left"}
        >
          {msg.text}
        </p>
      ))}
    </main>
  );
};

export default Chat;
