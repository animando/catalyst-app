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
      Cookies.set("AccessToken", token.access_token as string, {
        secure: false,
      });
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
