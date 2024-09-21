import { useState, useEffect } from "react";

const KEY = "b275b353";

export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controler = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        // setSelectedId(null);
        const response = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
          { signal: controler.signal }
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        if (data.Response == "False") {
          setMovies([]);
          throw new Error("Nothing has found");
        }

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
    }
    fetchData();

    return () => controler.abort();
  }, [query]);

  return { movies, isLoading, error };
}
