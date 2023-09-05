"use strict";
exports.__esModule = true;
exports.DataHandler = void 0;
/**
 * DataHandler class
 * Represents a data handler where all methods and fields related to data handling of data.json should
 * be created.
 */
var ATTA_1 = require("../data/ATTA");
var ATTA_priority_1 = require("../data/ATTA_priority");
;
var DataHandler = /** @class */ (function () {
    /**
     * initializes data, countries, cities
     */
    function DataHandler() {
        var _this = this;
        /**
         * fields
         */
        this.all_data = [];
        this.city_countries = [];
        this.priority_data = [];
        this.priority_city_countries = [];
        ATTA_1.data.forEach(function (datapoint) {
            var city_country = datapoint.city + ", " + datapoint.country;
            var newDataPoint = {
                uid: datapoint.uid,
                lat: datapoint.lat,
                lon: datapoint.lon,
                aqi: Number(datapoint.aqi),
                station: datapoint.station_name,
                city: datapoint.city,
                country: datapoint.country,
                city_country: city_country,
                image_filepath: datapoint.image_filepath
            };
            _this.all_data.push(newDataPoint);
            _this.city_countries.push(city_country);
        });
        //priority data
        ATTA_priority_1.data_priority.forEach(function (datapoint) {
            var city_country = datapoint.city + ", " + datapoint.country;
            var newDataPoint = {
                uid: datapoint.uid,
                lat: datapoint.lat,
                lon: datapoint.lon,
                aqi: datapoint.aqi,
                station: datapoint.station_name,
                city: datapoint.city,
                country: datapoint.country,
                city_country: city_country,
                image_filepath: datapoint.image_filepath
            };
            _this.priority_data.push(newDataPoint);
            _this.priority_city_countries.push(city_country);
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
    DataHandler.prototype.getData = function () {
        return this.all_data;
    };
    /**
     *
     * @returns array of strings, a city name with its country name
     */
    DataHandler.prototype.getCityCountries = function () {
        return this.city_countries;
    };
    /**
     *
     * @returns data for priority cities
     * Priority cities is a shortlisted array of cities that the app will display on default
     */
    DataHandler.prototype.getPriorityData = function () {
        return this.priority_data;
    };
    DataHandler.prototype.getPriorityCityCountries = function () {
        return this.priority_city_countries;
    };
    return DataHandler;
}());
exports.DataHandler = DataHandler;
