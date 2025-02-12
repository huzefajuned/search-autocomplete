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
      <div className="text-white flex flex-col gap-2 text-sm  p-1">
        <p className="">
          <span className="text-2xl">**Debounced API Calls:**</span> - Reduces
          unnecessary API calls by adding a delay before making requests.
        </p>

        <p>
          <span className="text-2xl">**Caching:**</span> - Stores previously
          searched results in memory to prevent redundant API calls.
        </p>
      </div>
      {/* Search Input */}
      <div className="flex flex-row items-center justify-center  relative   pt-5 pb-6  sm:pt-20 sm:pb-15 lg:pb-20 w-full  mt-10 sm:mt-4">
        <input
          onChange={handleOnChange}
          type="text"
          placeholder="Enter your query!"
          value={input}
          className="outline-none border-gray-500  bg-red-50 p-3 sm:p-3 lg:p-4 border-3 border-b-0 text-xl shadow-xl rounded-xl w-11/12 sm:w-8/12 lg:w-7/12 text-black placeholder-gray-500"
        />

        {/* Loading Indicator */}
        {loading && (
          <img
            className="w-10 h-10 absolute right-[6%] sm:right-[18%] lg:right-[22%] rounded-full border-2 border-gray-300"
            src="https://imgs.search.brave.com/hKTP_TW7g9L-0PEM2uSrilfQJUX-Z60wKsL0jiJWqFg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTAuZ2lwaHkuY29t/L21lZGlhL3hUazla/dk1uYklpSWV3N0lw/Vy9naXBoeS5naWY_/Y2lkPTc5MGI3NjEx/ZTZ2ZXFqNGxwMTcy/aDFmYjR0dXBkZHJy/ODdhaWlhNXc4Z3ln/NnRhbSZlcD12MV9n/aWZzX3NlYXJjaCZy/aWQ9Z2lwaHkuZ2lm/JmN0PWc.gif"
            alt="Loading..."
          />
        )}
      </div>

      {/* Results */}
      {data.length > 0 && (
        <div className="max-h-[40%] w-[90%] sm:w-[65%]  xl:w-[55%] flex flex-col gap-2 rounded-lg p-2 overflow-auto bg-gray-800 text-white">
          {data.map((title, i) => (
            <div
              key={i}
              className="py-2 px-3 cursor-pointer hover:bg-white hover:text-black border-2 border-white rounded-lg font-bold"
            >
              <h2 className="truncate">{title}</h2>
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
