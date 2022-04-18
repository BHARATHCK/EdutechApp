import { useEffect, useState } from "react";
import redaxios from "redaxios";

let cache = {};

export const useFetchAllCourses = (url: string) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [clearCache, setClearCache] = useState(false);

  useEffect(() => {
    console.log("CACHE CLEARED : ", cache);
    if (clearCache) {
      cache = {};
    }
  }, [clearCache]);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setIsFetching(true);
      // Check if the url response is previously cached
      if (cache[url]) {
        const data = cache[url];
        setData(data);
        setIsFetching(false);
      } else {
        const response = await redaxios.get(`${url}/courses`, {
          withCredentials: true,
        });
        const data = await response.data;
        // Add the response in cache
        cache[url] = data;
        setClearCache(false);
        setData(data);
        setIsFetching(false);
      }
    };

    fetchData();
  }, [url, clearCache]);

  return { isFetching, data, clearCache, setClearCache };
};
