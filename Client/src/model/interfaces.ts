/**
 * File where re-usable interfaces should be declared
 */
import { Dispatch, SetStateAction } from 'react';
import { City, Country } from "./DataHandler";

/**
 * interface type used to pass down cities and countries states from App.tsx
 * 
 */
export interface CitiesCountriesPropsInterface {
  cities: Array<City>,
  countries: Array<Country>;
  setCities: Dispatch<SetStateAction<City[]>>;
  setCountries: Dispatch<SetStateAction<Country[]>>;
}

/**
 * interface type
 * represents app window size
 */
export interface WindowSize {
  width: number;
  height: number;
}

