export * from "./reducer";
export * from "./state";

/* Just helpful information below.
  Amazing typescript - it allows export const dirrectly. Wow.!!!
  export { default as d1 } from "./reducer"; //Default is exported as d1
  export { default as d2 } from "./state";//Default is exported as d2

  import { d1 } from './state';
  import { d2 } from './state';

  Now default imports could be used as named exports(should be practising to use named exports only coz, it woud be less confusing if you are to export multiple files from a single file like this), coz its just better name convention to name separately the importedNamed though, they are as default imports in their files.

  ____
  These methodology is not good for default exports
  FROM REDUCER.TS
  Action from reducer.tsx
  reducer from reducer.tsx

  ___
  FROM STATE.TSX
  pintu
  StateContext
  StateProvider
  useStateValue

  State

 */