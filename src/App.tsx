import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<string[]>([]);
  const [cache, setCache] = useState<Record<string, string[]>>({});

  // API url
  const search_API = `https://dummyjson.com/products/search?q=${input}`;

  // Handle input change
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Fetch data from API with caching
  const fetchData = async () => {
    if (!input) {
      setData([]);
      return;
    }

    // Check cache before making an API call
    if (cache[input]) {
      console.log("Cache return");
      setData(cache[input]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(search_API);
      const result = await response.json();
      const titles = result.products.map(
        (product: { title: string }) => product.title
      );
      console.log("api call");
      setData(titles);
      setCache((prevCache) => ({ ...prevCache, [input]: titles }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce API call with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timer);
  }, [input]);

  console.log("cache :", cache);

  
  return (
    <div className="font-mono p-4 h-screen w-screen flex flex-col items-center bg-black">
      {/* Search Input */}
      <div className="flex flex-row items-center justify-center pt-20 pb-10 w-full relative">
        <input
          onChange={handleOnChange}
          type="text"
          placeholder="Enter your query!"
          value={input}
          className="outline-none border-gray-500 bg-red-50 p-4 border-3 border-b-0 text-xl shadow-xl rounded-xl text-black placeholder-gray-500 h-12 md:w-2xl"
        />

        {/* Loading Indicator */}
        {loading && (
          <img
            className="w-10 h-10 absolute right-[27%] rounded-full border-2 border-gray-300"
            src="https://imgs.search.brave.com/hKTP_TW7g9L-0PEM2uSrilfQJUX-Z60wKsL0jiJWqFg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTAuZ2lwaHkuY29t/L21lZGlhL3hUazla/dk1uYklpSWV3N0lw/Vy9naXBoeS5naWY_/Y2lkPTc5MGI3NjEx/ZTZ2ZXFqNGxwMTcy/aDFmYjR0dXBkZHJy/ODdhaWlhNXc4Z3ln/NnRhbSZlcD12MV9n/aWZzX3NlYXJjaCZy/aWQ9Z2lwaHkuZ2lm/JmN0PWc.gif"
            alt="Loading..."
          />
        )}
      </div>

      {/* Results */}
      {data.length > 0 && (
        <div className="max-h-[40%] w-[40%] flex flex-col gap-2 rounded-lg p-2 overflow-auto bg-gray-800 text-white">
          {data.map((title, i) => (
            <div
              key={i}
              className="py-2 px-3 cursor-pointer hover:bg-white hover:text-black border-2 border-white rounded-lg font-bold"
            >
              <h2>{title}</h2>
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {!loading && input && data.length === 0 && (
        <h2 className="text-3xl p-2 absolute bottom-[40%] text-cyan-900 shadow-2xl">
          Sorry, No matching Query found!
        </h2>
      )}
    </div>
  );
}

export default App;
