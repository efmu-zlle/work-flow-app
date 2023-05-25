import { Action, IResponseInit } from "../interfaces";
import { Dispatch, Reducer, useEffect, useReducer } from "react";
import { initialState } from "../utils/initialState";
import { reducer } from "../utils/reducer";
import { createContext } from "react";

export type ContextProps<T> = {
  state: IResponseInit<T>;
  dispatch: Dispatch<Action<T>>;
};

export const FetchContext = createContext<ContextProps<any>>(
  {} as ContextProps<any>
);

type Props = {
  children: JSX.Element | JSX.Element[];
};

export function FetchProvider<T>({ children }: Props) {
  const [state, dispatch] = useReducer<Reducer<IResponseInit<T>, Action<T>>>(
    reducer,
    initialState
  );

  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    }
  }, [state.currentUser]);

  return (
    <FetchContext.Provider value={{ state, dispatch }}>
      {children}
    </FetchContext.Provider>
  );
}
