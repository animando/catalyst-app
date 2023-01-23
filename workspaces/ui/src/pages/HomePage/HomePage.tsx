/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { webApi } from "../../api/webApi";
import { useAuthContext } from "../../auth/authContext";
import { useWebsockets } from "./useWebsockets";

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
  useWebsockets();
  const { data } = useHomePageData();
  const authContext = useAuthContext();

  return (
    <div>
      <p>Username: {authContext.username}</p>
      <p>Groups: {JSON.stringify(authContext.groups)}</p>
      {data}
    </div>
  );
}
