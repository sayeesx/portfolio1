"use client";
import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi! I'm SayeesBot. Ask me anything!" }]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("https://chatbot-3-ayjr.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { from: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, I couldn't connect to SayeesBot." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl max-w-md w-full mx-auto shadow-2xl">
      <h2 className="text-xl font-bold mb-3 text-center">💬 SayeesBot</h2>
      <div className="h-64 overflow-y-auto bg-gray-800 rounded-lg p-2 mb-2 border border-gray-700">
        {messages.map((msg, i) => (
          <div key={i} className={`my-1 ${msg.from === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block px-3 py-1 rounded-lg ${
                msg.from === "user" ? "bg-blue-600" : "bg-green-700"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 rounded-md text-black"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
