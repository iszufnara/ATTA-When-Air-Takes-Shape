import { toHaveStyle } from "@testing-library/jest-dom/matchers";
import raw_data from "../data/sample_offline_data.json";

/**
 * DataHandler class 
 * Represents a data handler where all methods and fields related to data handling of data.json should
 * be created. 
 */

interface Station {
  name: string;
  time: string;
}
interface Datapoint {
  lat: number,
  lon: number;
  uid: number,
  aqi: string,
  station: Station,
  city: string | undefined,
  country: string | undefined,
  country_code: string | undefined,
  economy: string | undefined,
  code: string | undefined,
  region: string | undefined,
  income_group: string | number | undefined,
  lending_category: string | number | undefined;
};

type Country = string | undefined;
type City = string | undefined;

class DataHandler {
  /**
   * fields
   */
  private data: Array<Datapoint> = [];
  private countries: Array<Country> = [];
  private cities: Array<City> = [];
  /**
   * 
   */
  constructor() {
    raw_data.forEach((datapoint) => {
      const newDataPoint: Datapoint = {
        lat: datapoint.lat,
        lon: datapoint.lon,
        uid: datapoint.uid,
        aqi: datapoint.aqi,
        station: {
          name: datapoint.station.name,
          time: datapoint.station.time
        },
        city: datapoint.city,
        country: datapoint.country,
        country_code: datapoint.country_code,
        economy: datapoint.Economy,
        code: datapoint.Code,
        region: datapoint.Region,
        income_group: datapoint["Income group"],
        lending_category: datapoint["Lending category"]
      };
      this.data.push(newDataPoint);
      this.countries.push(datapoint.country);
      this.cities.push(datapoint.city);
    });
  }

  /**
   * 
   * @returns array of countries
   */
  public getCountries(): Array<Country> {
    return this.countries;
  }

  /**
   * 
   * @returns array of cities 
   */
  public getCities(): Array<City> {
    return this.cities;
  }

  /**
   * 
   * @returns 
   */
  public getData(): Array<Datapoint> {
    return this.data;
  }

  /**
   * 
   * @param searchTerm 
   * @returns 
   */
  public getCountryInfo(searchTerm: string): Datapoint | undefined {
    return this.data.find(datapoint => {
      datapoint.country?.toLowerCase() == searchTerm.toLowerCase();
    });
  } 

  /**
   * 
   * @param searchTerm 
   * @returns 
   */
  public getInfoBasedOnCity(searchTerm:string) : Datapoint | undefined {
    return this.data.find(datapoint => {
      datapoint.country?.toLowerCase() == searchTerm.toLowerCase();
    })
  }
}

export { DataHandler };