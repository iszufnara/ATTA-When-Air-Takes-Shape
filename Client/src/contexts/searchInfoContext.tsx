/**
 * Search Information Context file. 
 * creates SearchInfoContext that consists of a SearchInfoInterface.
 */
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

export interface Center {
  lat: number,
  lng: number,
}

export interface SearchInfo {
  term: string;
  zoom: number,
  center: Center;
}

export interface SearchInfoInterface {
  searchInfo: SearchInfo,
  setSearchInfo: Dispatch<SetStateAction<SearchInfo>>;
};

const defaultState = {
  searchInfo: {
    term: "",
    zoom: 0,
    center: { lat: 0, lng: 0 }
  },
  setSearchInfo: (searchInfo: SearchInfo) => { }
} as SearchInfoInterface;

export const SearchInfoContext = createContext<SearchInfoInterface>(defaultState)

