/**
 * File where re-usable interfaces should be declared
 */
import { Dispatch, SetStateAction } from 'react';
import { City, Country } from "./DataHandler";

/**
 * interface type used to pass down cities and countries states to SearchBar.tsx and MapRoute.tsx
 * from App.tsx
 * 
 */
export interface citiesCountriesPropsInterface {
  cities: Array<City>,
  countries: Array<Country>;
  setCities: Dispatch<SetStateAction<City[]>>;
  setCountries: Dispatch<SetStateAction<Country[]>>;
}