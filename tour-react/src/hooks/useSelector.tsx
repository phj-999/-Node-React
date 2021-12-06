import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
  } from "react-redux";
import store from "../store";

export type RootState = ReturnType<typeof store.getState>

export const useSelector:TypedUseSelectorHook<RootState> = useReduxSelector