import { useEffect, useState } from "react";
import { webApi } from "../../api/webApi";

interface ApiResponse {
  message: string;
}
const useHomePageData = () => {
  const [data, setData] = useState<string>();
  useEffect(() => {
    (async () => {
      const response = await webApi.get<ApiResponse>("/hello");
      setData(response.data.message);
    })();
  }, []);

  return { data };
};

export function HomePage() {
  const { data } = useHomePageData();

  return <div>{data}</div>;
}
