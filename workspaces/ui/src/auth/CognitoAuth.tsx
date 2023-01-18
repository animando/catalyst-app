import { ReactNode, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { environment } from "../utils/environment";
import { AuthContext, AuthContextProvider } from "./authContext";
import { setApiToken } from "../api/webApi";

const cookieBase = `CognitoIdentityServiceProvider.${environment.USER_POOL_CLIENT_ID}`;

const useCognito = (localToken?: string) => {
  const [authContext, setAuthContext] = useState<AuthContext>();
  const [errorAuthenticating, setErrorAuthenticating] = useState(false);

  useEffect(() => {
    let accessToken = localToken;

    const user = Cookies.get(`${cookieBase}.LastAuthUser`);
    accessToken = Cookies.get(`${cookieBase}.${user}.accessToken`);

    if (!accessToken && localToken) {
      Cookies.set(`${cookieBase}.LastAuthUser`, "gk");
      Cookies.set(`${cookieBase}.gk.accessToken`, localToken);
    }

    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded = jwtDecode(accessToken) as any;
      setApiToken(accessToken);
      setAuthContext({
        username: decoded.username,
        groups: decoded["cognito:groups"],
      });
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

  return errorAuthenticating || !authContext ? (
    <div>Unauthenticated</div>
  ) : (
    <AuthContextProvider value={authContext}>{children}</AuthContextProvider>
  );
}
