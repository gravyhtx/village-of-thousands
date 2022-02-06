import { useEffect, useState } from "react";

export default function getData(fetch, fn) {
  const [data, setData] = useState({});
  const loadData = async () => {
    if(fn){fn}
    const res = await fetch;
    setData(await res.json());
  };
  useEffect(() => {
    loadData();
    return () => {};
  }, []);
  return data;
}