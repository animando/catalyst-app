import { ReactNode, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { environment } from "../utils/environment";
import { AuthContext, AuthContextProvider } from "./authContext";

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
      Cookies.set(
        `${cookieBase}.gk.accessToken`,
        "header.eyJ1c2VybmFtZSI6ImplcmVteSJ9.signature"
      );
    }

    if (accessToken) {
      const decoded = jwtDecode(accessToken) as AuthContext;
      setAuthContext(decoded);
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
