/**
 * Search Information Context file. 
 * creates SearchInfoContext that consists of a SearchInfoInterface.
 * SearchInfoInterface has two fields, a SearchInfo object and Dispatch function 
 * that sets the SearchInfo object.
 */
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";


export interface SearchInfo {
  term: string,
  byCity: boolean;
}

export interface SearchInfoInterface {
  searchInfo: SearchInfo,
  setSearchInfo: Dispatch<SetStateAction<SearchInfo>>;
};

const defaultState = {
  searchInfo: {
    term: "",
    byCity: false
  },
  setSearchInfo: (searchInfo: SearchInfo) => { }
} as SearchInfoInterface;

export const SearchInfoContext = createContext<SearchInfoInterface>(defaultState)

