import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<[] | null>([]);
  const search_API = `https://dummyjson.com/products/search?q=${input}`;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // fetch the api function
  const fetchData = () => {
    if (input === "") return setData([]);
    setLoading(true);
    console.log("useEffect Hit!");
    fetch(search_API)
      .then((res) => res.json())
      .then((data) => {
        console.log("api hit!");
        // store only titles in an array!
        const onlyTitles = data.products.map(
          (product: { title: string }) => product.title
        );
        setData(onlyTitles);
      })
      .catch((err) => console.log("err in api", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 400);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className=" font-mono p-2 h-screen w-screen flex flex-col justify-start gap-10  items-center  bg-gray-200">
      {/* input */}
      <div className="flex flex-row items-center relative pt-20 pb-10">
        <input
          onChange={(e) => handleOnChange(e)}
          type="text"
          placeholder="Enter your query!"
          value={input}
          className="outline-none  border-gray-300 bg-red-50 p-4 border-2 active:outline-red-200   text-xl shadow-2xl  rounded-xl text-black font-normal  placeholder:font-normal placeholder-gray-500  placeholder:text-lg placeholder:space-x-0.5  h-12   sm:h-13  md:w-2xl md:h-14"
        />
        {/* loading UI , when api is calling */}

        <img
          className={`${
            loading ? "flex" : "hidden"
          }   w-10 h-10 bg-transparent  absolute right-2   rounded-full border-2 border-gray-300  `}
          src="https://imgs.search.brave.com/hKTP_TW7g9L-0PEM2uSrilfQJUX-Z60wKsL0jiJWqFg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTAuZ2lwaHkuY29t/L21lZGlhL3hUazla/dk1uYklpSWV3N0lw/Vy9naXBoeS5naWY_/Y2lkPTc5MGI3NjEx/ZTZ2ZXFqNGxwMTcy/aDFmYjR0dXBkZHJy/ODdhaWlhNXc4Z3ln/NnRhbSZlcD12MV9n/aWZzX3NlYXJjaCZy/aWQ9Z2lwaHkuZ2lm/JmN0PWc.gif"
          alt=""
        />
      </div>

      {/* results */}
      {data?.length !== 0 && (
        <div className="bg-gray-100 max-h-[40%] w-[40%] flex flex-col gap-2 rounded-lg p-2 overflow-scroll">
          {data?.map((title: string, i: number) => {
            return (
              <div
                key={i}
                className="bg-gray-400 py-2 px-1 cursor-pointer hover:bg-white rounded-4xl font-bold text-amber-200 hover:text-black border-2"
              >
                <h2>{title}</h2>
              </div>
            );
          })}
        </div>
      )}
      {/* when query & no data result is available */}
      {input !== "" && data?.length === 0 && !loading && (
        <div className="bg-amber-50 rounded-2xl p-2">
          <h2 className="text-3xl p-2">Sorry, No matching Query found!</h2>
        </div>
      )}
    </div>
  );
}

export default App;
