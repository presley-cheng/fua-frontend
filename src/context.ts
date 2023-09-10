import { createContext } from "react";
import User from "./types/user";

export const appContext = createContext({ user: {} as User });
