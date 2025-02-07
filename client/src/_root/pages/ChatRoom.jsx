import { useState, useEffect, useRef } from "react";
import ThreeDots from "../../components/ThreeDots";
import { useLocation } from "react-router-dom";

const ChatRoom = () => {
  const location = useLocation();
  const profile = location.state?.profile || {}; // Ensure we get a valid object

  console.log("📩 Profile Data in Chat Room:", profile); // ✅ Debug log
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! 😊", sender: "Anna", time: new Date() },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update timestamps every second for real-time effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => [...prev]); // Trigger re-render to update timestamps
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} min ago`;

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "You",
      time: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate a chatbot response after 1.5 seconds
    setTimeout(() => {
      const botResponse = {
        id: Date.now(),
        text: "That sounds interesting! 😃",
        sender: "Anna",
        time: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  return (
    <main className="mt-4">
      {/* Chat Header */}
      <div className="flex justify-between items-center bg-white px-4 py-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={
                profile.photo_profile
                  ? `http://localhost:5000/uploads/${profile.photo_profile}`
                  : "/default-profile.png"
              }
              alt={profile.name || "Unknown"}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-md">{profile.name || "Unknown"}</h4>
            <p className="text-neutral-700 text-xs">Online</p>
          </div>
        </div>
        <button>
          <ThreeDots />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="absolute bg-tertiary top-32 left-0 right-0 bottom-24 py-6 px-6 flex flex-col tracking-tight overflow-y-auto">
        <div className="flex justify-center">
          <p className="text-xs text-neutral-600">Today</p>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-[13px] ${
                msg.sender === "You"
                  ? "bg-primary text-white"
                  : "bg-secondary text-white"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-[10px] text-neutral-100 text-right mt-1">
                {getTime(msg.time)}
              </p>
            </div>
          </div>
        ))}

        {/* Scroll to latest message */}
        <div ref={chatEndRef}></div>
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-24 left-0 right-0 px-4 py-4">
        <form className="flex gap-4" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full py-3 px-6 border border-neutral-200 rounded-full text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="text-sm bg-primary text-white px-4 py-2 rounded-full"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
};

export default ChatRoom;
