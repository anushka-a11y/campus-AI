import Navbar from "@/components/Navbar";
import ChatBox from "@/components/ChatBox";

export default function ChatPage() {
  return (
    <>
      <Navbar />

      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Campus AI Assistant
        </h1>

        <ChatBox />
      </main>
    </>
  );
}