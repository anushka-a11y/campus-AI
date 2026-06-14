async function getAcademics() {
  const res = await fetch(
    "http://localhost:3004/academics",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function AcademicsPage() {
  const academics =
    await getAcademics();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-black mb-6">
        🎓 Academics
      </h1>

      <div className="space-y-4">
        {academics.map(
          (item: any, index: number) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-white"
            >
              <h2 className="font-semibold text-black">
                {item.topic}
              </h2>

              <p className="text-gray-600">
                {item.value}
              </p>
            </div>
          )
        )}
      </div>
    </main>
  );
}