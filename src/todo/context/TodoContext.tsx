import { createContext } from "react";
import { contextProps } from "../interfaces/interfaces";

export const TodoContext = createContext<contextProps>({} as contextProps);