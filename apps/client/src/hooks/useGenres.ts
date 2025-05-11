import { useEffect, useState } from "react";
import { movieService } from "../services/movieService";
export function useGenres() {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    movieService.findGenres().then(setData).catch(console.error);
  }, []);
  return data;
}