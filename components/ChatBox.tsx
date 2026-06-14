"use client";


import { useState } from "react";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your Campus AI Assistant.",
    },
  ]);

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = input;

  setMessages([
    ...messages,
    {
      role: "user",
      content: userMessage,
    },
  ]);

  setInput("");
  setLoading(true);

  const response = await fetch(
    "/api/chat",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    }
  );

  const data = await response.json();

  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content: data.response,
    },
  ]);

  setLoading(false);
};

  return (
    <div className="max-w-4xl mx-auto">
      <div className="border rounded-lg p-4 h-[500px] overflow-y-auto bg-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
          <div
            className={`inline-block px-4 py-2 rounded-lg whitespace-pre-line ${
            message.role === "user" 
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-black"
            }`}
          >
            {message.content}
          </div>
          </div>
        ))}
        {loading && (
        <p className="text-black mt-2">
        Thinking...
        </p>
      )}
      </div>


      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 border rounded-lg p-3 text-black bg-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-6 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}