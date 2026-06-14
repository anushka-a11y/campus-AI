async function getBooks() {
  const res = await fetch("http://localhost:3001/books", {
    cache: "no-store",
  });

  return res.json();
}

export default async function LibraryPage() {
  const books = await getBooks();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-black mb-6">
        📚 Library
      </h1>

      <div className="space-y-4">
        {books.map((book: any, index: number) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-white"
          >
            <h2 className="font-semibold text-black">
              {book.title}
            </h2>

            <p className="text-gray-600">
              Available: {book.available ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}