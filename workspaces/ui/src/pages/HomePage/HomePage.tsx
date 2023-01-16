import { useEffect, useState } from "react";
import { webApi } from "../../api/webApi";
import { useAuthContext } from "../../auth/authContext";

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
  const authContext = useAuthContext();

  return (
    <div>
      <p>Logged in as {authContext.username}</p>
      {data}
    </div>
  );
}
