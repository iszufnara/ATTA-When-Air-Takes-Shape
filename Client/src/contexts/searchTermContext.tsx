//libraries
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

export interface SearchTermContextInterface {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const defaultState = {
  searchTerm: "",
  setSearchTerm: (searchTerm: string) => { }
} as SearchTermContextInterface;

export const SearchTermContext = createContext<SearchTermContextInterface>(defaultState)

