import { ReactNode } from "react";
import Cookies from "js-cookie";
import { environment } from "../utils/environment";

const useCognito = () => {
  console.log("auth");

  Cookies.get("abc");
  return {
    authenticated: false,
  };
};

interface Props {
  children: ReactNode;
}
export function CognitoAuth({ children }: Props) {
  const { authenticated } = useCognito();

  if (!authenticated) {
    setTimeout(() => {
      window.location.href = `${environment.USER_POOL_UI_ENDPOINT}/login?client_id=${environment.USER_POOL_CLIENT_ID}&redirect_uri=${environment.APP_HOST}&response_type=code&scope=email+openid+profile`;
    }, 20000);
  }

  return <div>{children}</div>;
}
