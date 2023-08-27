"use strict";
exports.__esModule = true;
exports.DataHandler = void 0;
/**
 * DataHandler class
 * Represents a data handler where all methods and fields related to data handling of data.json should
 * be created.
 */
var official_data_1 = require("../data/official_data");
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
        this.data = [];
        this.countries = [];
        this.cities = [];
        official_data_1.data.forEach(function (datapoint) {
            var newDataPoint = {
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
            _this.data.push(newDataPoint);
            _this.countries.push(datapoint.country);
            _this.cities.push(datapoint.city);
        });
    }
    /**
     *
     * @returns array of countries
     */
    DataHandler.prototype.getCountries = function () {
        return this.countries;
    };
    /**
     *
     * @returns array of cities
     */
    DataHandler.prototype.getCities = function () {
        return this.cities;
    };
    /**
     *
     * @returns
     */
    DataHandler.prototype.getData = function () {
        return this.data;
    };
    return DataHandler;
}());
exports.DataHandler = DataHandler;
