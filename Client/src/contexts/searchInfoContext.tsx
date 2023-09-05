/**
 * Search Information Context file. 
 * creates SearchInfoContext that consists of a SearchInfoInterface.
 * term is the search term input by user in SearchBar.
 * Center refers to the current center of the google maps object in latitude and longitude.
 * zoom is the level of zoom of the google maps.
 * activeMarker is the unique identifier of the location marker that has been selected by user. 
 * datapoint is the Datapoint object selected by user. 
 */
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";
import { Datapoint } from "../model/DataHandler";

export interface Center {
  lat: number,
  lng: number,
}

export interface SearchInfo {
  term: string;
  zoom: number | undefined,
  center: Center;
  activeMarker: number | null;
  datapoint: Datapoint | null
}

export interface SearchInfoInterface {
  searchInfo: SearchInfo,
  setSearchInfo: Dispatch<SetStateAction<SearchInfo>>;
};

const defaultState = {
  searchInfo: {
    term: "",
    zoom: 0,
    center: { lat: 0, lng: 0 },
    activeMarker: null, 
    datapoint: null
  },
  setSearchInfo: (searchInfo: SearchInfo) => { }
} as SearchInfoInterface;

export const SearchInfoContext = createContext<SearchInfoInterface>(defaultState)

