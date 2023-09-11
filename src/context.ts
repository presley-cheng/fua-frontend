import { createContext } from "react";
import { UserType } from "./types";

export const appContext = createContext({
  user: {} as UserType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (_obj: UserType) => {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setError: (_message: string) => {},
});
