async function getEvents() {
  const res = await fetch("http://localhost:3002/events", {
    cache: "no-store",
  });

  return res.json();
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-black mb-6">
        🎉 Events
      </h1>

      <div className="space-y-4">
        {events.map((event: any, index: number) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-white"
          >
            <h2 className="font-semibold text-black">
              {event.name}
            </h2>

            <p className="text-gray-600">
              {event.date}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
