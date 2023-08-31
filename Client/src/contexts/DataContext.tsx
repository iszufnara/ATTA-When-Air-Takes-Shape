/**
 * Data Context file. 
 */
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";
import { City, CityCountry, Country, Datapoint } from "../model/DataHandler";


export interface Data {
  all_data: Array<Datapoint>;
  city_countries: Array<CityCountry>;
  priority_data: Array<Datapoint>;
  priority_city_countries: Array<CityCountry>;
}

export interface DataInterface {
  data: Data,
  setData: Dispatch<SetStateAction<Data>>;
};

const defaultState = {
  data: {
    all_data: [],
    city_countries: [],
    priority_data: [],
    priority_city_countries: []
  },
  setData: (data: Data) => { }
} as DataInterface;

export const DataContext = createContext<DataInterface>(defaultState)

