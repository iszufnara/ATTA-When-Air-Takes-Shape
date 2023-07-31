import raw_data from "../data/data.json";

// DataHandler class 
// Represents a data handler where all methods and fields related to data handling of data.json should
// be created. 

// type used in the data field for the array
type T = any;

class DataHandler {

  // fields
  data: Array<T>;

  // Constructor
  constructor() {
    this.data = [];
    const newData: Array<T> = raw_data.data;
    newData.forEach(key => this.data.push(key));
  }

}

export { DataHandler };