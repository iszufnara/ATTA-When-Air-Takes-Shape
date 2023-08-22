import { createContext, Dispatch, SetStateAction } from "react";
import { WindowSize } from "../model/interfaces";


export interface WindoSizeInterace {
  windowObject: WindowSize,
  setWindowObject: Dispatch<SetStateAction<WindowSize>>;
};

const defaultState = {
  windowObject: {
    width: 0,
    height: 0
  },
  setWindowObject: (windowObject: WindowSize) => { }
} as WindoSizeInterace;

export const WindowContext = createContext<WindoSizeInterace>(defaultState);
