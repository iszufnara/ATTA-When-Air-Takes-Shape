/**
 * DataHandler class 
 * Represents a data handler where all methods and fields related to data handling of data.json should
 * be created. 
 */
import { data } from "../data/ATTA";
import { data_priority } from "../data/ATTA_priority";

interface Station {
  name: string;
  time: string;
}

export type Country = string;
export type City = string;
export type CityCountry = string;

export interface Datapoint {
  uid: number,
  lat: number,
  lon: number,
  aqi: number,
  station: string,
  city: City,
  country: Country,
  city_country: string,
  image_filepath: string,
};


class DataHandler {
  /**
   * fields
   */
  private all_data: Array<Datapoint> = [];
  private city_countries: Array<CityCountry> = [];

  private priority_data: Array<Datapoint> = [];
  private priority_city_countries: Array<CityCountry> = [];

  /**
   * initializes data, countries, cities
   */
  constructor() {
    data.forEach((datapoint) => {
      let city_country: string = datapoint.city + ", " + datapoint.country;
      const newDataPoint: Datapoint = {
        uid: datapoint.uid,
        lat: datapoint.lat,
        lon: datapoint.lon,
        aqi: Number(datapoint.aqi),
        station: datapoint.station_name,
        city: datapoint.city,
        country: datapoint.country,
        city_country: city_country,
        image_filepath: datapoint.image_filepath,
      };
      this.all_data.push(newDataPoint);
      this.city_countries.push(city_country);
    });

    //priority data
    data_priority.forEach((datapoint) => {
      let city_country: string = datapoint.city + ", " + datapoint.country;
      const newDataPoint: Datapoint = {
        uid: datapoint.uid,
        lat: datapoint.lat,
        lon: datapoint.lon,
        aqi: datapoint.aqi,
        station: datapoint.station_name,
        city: datapoint.city,
        country: datapoint.country,
        city_country: city_country,
        image_filepath: datapoint.image_filepath,
      };
      this.priority_data.push(newDataPoint);
      this.priority_city_countries.push(city_country);
    });
  }

  /**
   * 
   * @returns array of countries
   */
  // public getCountries(): Array<Country> {
  //   return this.countries;
  // }

  /**
   * 
   * @returns array of cities 
   */
  // public getCities(): Array<City> {
  //   return this.cities;
  // }

  /**
   * 
   * @returns 
   */
  public getData(): Array<Datapoint> {
    return this.all_data;
  }

  /**
   * 
   * @returns array of strings, a city name with its country name
   */
  public getCityCountries(): Array<CityCountry> {
    return this.city_countries;
  }

  /**
   * 
   * @returns data for priority cities
   * Priority cities is a shortlisted array of cities that the app will display on default
   */
  public getPriorityData(): Array<Datapoint> {
    return this.priority_data;
  }

  public getPriorityCityCountries(): Array<CityCountry> {
    return this.priority_city_countries;
  }

  // /**
  //  * 
  //  * @param searchTerm 
  //  * @returns 
  //  */
  // public getCountryInfo(searchTerm: string): Datapoint | undefined {
  //   return this.data.find(datapoint => {
  //     datapoint.country?.toLowerCase() == searchTerm.toLowerCase();
  //   });
  // } 

  //   /**
  //    * 
  //    * @param searchTerm 
  //    * @returns 
  //    */
  //   public getInfoBasedOnCity(searchTerm:string) : Datapoint | undefined {
  //     return this.data.find(datapoint => {
  //       datapoint.country?.toLowerCase() == searchTerm.toLowerCase();
  //     })
  //   }
}

export { DataHandler };