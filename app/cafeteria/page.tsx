async function getMenu() {
  const res = await fetch(
    "http://localhost:3003/menu",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function CafeteriaPage() {
  const menu = await getMenu();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-black mb-6">
        🍽️ Cafeteria Menu
      </h1>

      <div className="space-y-4">
        {menu.map((item: any, index: number) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-white"
          >
            <h2 className="font-semibold text-black">
              {item.day}
            </h2>

            <p className="text-gray-600">
              {item.menu}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}