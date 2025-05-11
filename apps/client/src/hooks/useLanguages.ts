import { useEffect, useState } from "react";
import { movieService } from "../services/movieService";

export function useLanguages() {
    const [data, setData] = useState<string[]>([]);
    useEffect(() => {
      movieService.findLanguages().then(setData).catch(console.error);
    }, []);
    return data;
  }