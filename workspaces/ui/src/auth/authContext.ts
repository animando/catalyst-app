import { createContext, useContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AuthContext = {
  username: string;
};
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const authContext = createContext<AuthContext>(null!);

export const AuthContextProvider = authContext.Provider;

export const useAuthContext = () => useContext(authContext);
