import { ReactNode, useEffect, useState } from "react";
import { parse } from "querystring";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { environment } from "../utils/environment";
import { AuthContext, AuthContextProvider } from "./authContext";
import { redirectToLogin } from "./redirectToLogin";

const useCognito = (localToken?: string) => {
  const [authContext, setAuthContext] = useState();
  const [errorAuthenticating, setErrorAuthenticating] = useState(false);

  useEffect(() => {
    let accessToken;

    if (window.location.hash) {
      const token = parse(window.location.hash);
      Cookies.set("AccessToken", token.access_token as string);
      window.location.href = environment.APP_HOST;
      return;
    }

    if (localToken) {
      accessToken = localToken;
    } else {
      const accessTokenCookie = Cookies.get("AccessToken");
      if (accessTokenCookie) {
        accessToken = accessTokenCookie;
      }
    }
    if (accessToken) {
      const decoded = jwtDecode(accessToken) as AuthContext;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setAuthContext(decoded as any);
    } else {
      setErrorAuthenticating(true);
    }
  }, [localToken]);

  return {
    errorAuthenticating,
    authContext,
  };
};

interface Props {
  children: ReactNode;
}

export function CognitoAuth({ children }: Props) {
  const { authContext, errorAuthenticating } = useCognito(environment.TOKEN);

  if (!authContext || errorAuthenticating) {
    if (errorAuthenticating) {
      redirectToLogin();
    }
    return null;
  }

  return (
    <AuthContextProvider value={authContext}>{children}</AuthContextProvider>
  );
}

// eyJraWQiOiJaWHlkZkg5MEV6Mkt2cGhsaCtja3hwQWNqMkpQXC85XC9tcXRaT0ErT1wvUlwvOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0MTZlNzU5MC00YTRmLTQ5N2YtOGI1Mi0wNDcxYzhmOTIwZGUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjczODkzNzA0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9IWTQxMzhqejciLCJleHAiOjE2NzM4OTczMDQsImlhdCI6MTY3Mzg5MzcwNCwidmVyc2lvbiI6MiwianRpIjoiODk2OTJhMDYtM2Y3Yi00ODkwLTlhZTctZDEyNTk4NDdjYmEzIiwiY2xpZW50X2lkIjoiNGpjOG1hbTZ1cW92amltb21kcjNnbjU1YnYiLCJ1c2VybmFtZSI6ImdrIn0.VVk5MB-G2TVUZIZnGhy55mcfEmQfyKJH08Bbun1JrmdQ8-n_tq7M1e1eff3jpzRoOpzzGCeOS0i4sj9R24GHZj44Ap-TOVa78HACWB_xojUoRfzH87esERC18fwyKH-T_JQPu-KgfQ9exK55WdxqDbUraCo4mayAHqMqaSUTUvoVDFrM6NN-LYAsria1DxhAnZiFvBMkA2WMtsJXAwpmHyI71NXNQd_Xgz7QK3iHqKVtQmJWC2qh5k7N8v9ELfv2MELKVxLnHSAgUnUCF2Y3yNcDZJ8DYiYNyybddC4Uwkavu-gwR_qItzrVhN2VS_vwqlS1GFA0L8BDlgHjgzOWOQ
