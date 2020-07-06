import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { Patient } from "../types";

import { Action } from "./reducer";

//for testing default imports
// const bike = "pulsar";
// export default bike;

export const pintu = 23;


export type State = {
  //MY TESTING CODE BELOW.!!
  patients: { [id: string]: Patient };
  // patients: { [id: string]: Patient|undefined };
  // patients: { [id: string]: Map<string, Patient> };
};

const initialState: State = {
  patients: {}
};


export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
// export const useStateValue = () => useContext(StateContext); // older line of code that says return type required.
export const useStateValue = (): [State, Dispatch<Action>] => useContext(StateContext);
