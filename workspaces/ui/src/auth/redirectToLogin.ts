import { environment } from "../utils/environment";

export const redirectToLogin = () => {
  window.location.href = `${environment.USER_POOL_UI_ENDPOINT}/login?client_id=${environment.USER_POOL_CLIENT_ID}&redirect_uri=${environment.APP_HOST}&response_type=token&scope=email+openid+profile`;
};
