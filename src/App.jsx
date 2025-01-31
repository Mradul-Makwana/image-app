import { Search } from "lucide-react";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import ImageCart from "./component/ImageCart";

function App() {
  const accessKey = import.meta.env.VITE_VITE_ACCESS_KEY;
  const [data, setData] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [imageData, setImageData] = useState([]);

  const inputHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setImageData([]);
    setPage(1);
    searchImage(1, input);
  };

  const buttonHandler = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    searchImage(nextPage, input);
  };

  function searchImage(page, input = "random") {
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${accessKey}&per_page=12`
      )
      .then((res) => {
        setLoading(false);
        setData(res.data.total);
        setImageData((prev) => [...prev, ...res.data.results]);
      })
      .catch(() => {
        setData(0);
        setLoading(false);
      });
  }

  return (
    <div className="parent">
      <form onSubmit={inputHandler}>
        <div className="main flex">
          <div className="input-container">
            <input
              placeholder="Search image..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-field"
              type="text"
            />
            <label htmlFor="input-field" className="input-label">
              Search Image
            </label>
            <span className="input-highlight"></span>
          </div>
          <button>
            <Search />
          </button>
        </div>
      </form>

      <div className="image">
        {loading ? (
          <div className="text-center mt-[200px] m-auto">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
            <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
          </div>
        ) : null}

        <ImageCart imageData={imageData} />
      </div>

      {imageData.length === 0 && !loading && data == 0 ? (
        <h1 className="flex mt-[190px] justify-center m-auto">
          No results found for your search.
        </h1>
      ) : null}

      {imageData.length > 0 ? (
        <button
          onClick={buttonHandler}
          className="h-[53px] mt-2 w-[200px] m-auto border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-16 rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold"
        >
          <div className="absolute right-32 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
          <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
          <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150 duration-500 bg-sky-700"></div>
          <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-500 bg-sky-600"></div>
          <p className="z-10">See more</p>
        </button>
      ) : null}
    </div>
  );
}

export default App;
