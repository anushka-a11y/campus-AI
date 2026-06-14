import Link from "next/link";

export default function Home() {
  const cards = [
    {
      title: "Library",
      description: "Browse available books",
      icon: "📚",
      href: "/library",
    },
    {
      title: "Events",
      description: "View upcoming campus events",
      icon: "🎉",
      href: "/events",
    },
    {
      title: "Cafeteria",
      description: "Check today's menu",
      icon: "🍽️",
      href: "/cafeteria",
    },
    {
      title: "Academics",
      description: "Attendance, credits and policies",
      icon: "🎓",
      href: "/academics",
    }
  ];

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-8 text-black">
        Unified Campus Intelligence Dashboard
      </h1>
    <Link href="/chat">
        <div className="mb-10 cursor-pointer">
          <div className="bg-white border rounded-xl shadow p-6 hover:shadow-lg transition">
            <p className="text-gray-500 text-lg">
              🤖 Ask the Campus AI Assistant...
            </p>
          </div>
        </div>
    </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div className="border rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer bg-white">
              <div className="text-5xl mb-3">
                {card.icon}
              </div>

              <h2 className="text-2xl font-semibold text-black">
                {card.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}