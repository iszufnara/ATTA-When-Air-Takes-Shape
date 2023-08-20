//styles import 
import './App.css';

// Import statements
import { useState, createContext, Dispatch, SetStateAction, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MapRoute } from './routes/MapRoute';
import { AboutUs } from './routes/AboutUs';
import { DataRoute } from './routes/DataRoute';
import NavBar from './components/Navbar';
import SearchBar from './components/Searchbar';
import { TakeAction } from './routes/TakeAction';
import { SearchInfo, SearchInfoContext } from './contexts/searchInfoContext';
import { DataHandler, Country, City } from './model/DataHandler';

/* 
Project Structure 

This is the main component of the web app.
Below the App function renders the components SearchBar, Navbar and 
the components specified under Routes. 
Route components are MapRoute, DataRoute, TakeActionRoute, AboutUs. 
Each route has its own .tsx file under routes folder. 
Any code associated with a given route will be written in its file accordingly.
Code for NavBar and SearchBar can be found under the components folder. 
Code associated with those components will be written in those files accordingly. 

Routes vs Components 
Routes serve as higher level component for all other components. 
For example, in route AboutUs, there we include subcomponents that need to be rendered in that route. 
In route Data, there we render subcomponents that need to be rendered in that route. 
Subcomponents could be cards, figures, charts, data visualizations, etc. 
*/

/* 
CSS styles

Every .tsx has a .css file associated with it. 
Styles for the component Navbar.tsx will be included in navbar.css and so on.
The css file for Navbar.tsx will be found in a subfolder under components. 
Css files for routes are found in its respective subfolder. 
The only css files included at a high level are App.css and index.css
*/

function App() {
  // function sendAQI(aqi: number) {
  //   fetch('http://localhost:3001/aqi?value='+aqi, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',

  //   },
  // })
  //   .then(res => res.json());
  // }

  /**
   * global search info state, used to search for cities in SearchBar and MapRoute.
   * will be passed down to other components through SearchInfoContext.Provider
   */
  const info: SearchInfo = {
    term: "",
    byCity: true,
  };
  const [searchInfo, setSearchInfo] = useState<SearchInfo>(info);

  /**
   * data handler, used to obtain data on cities and countries.
   * created using useMemo hook to only initialize it once on the first render of the app.
   */
  const dataHandler = useMemo(() => new DataHandler(), []);

  /**
   * countries and cities states.
   * will be passed down as props to SearchBar and MapRoute
   */
  const [cities, setCities] = useState<Array<City>>(dataHandler.getCities());
  const [countries, setCountries] = useState<Array<Country>>(dataHandler.getCountries());


  return (
    <Router>
      <div>
        <main>
          <SearchInfoContext.Provider value={{ searchInfo, setSearchInfo }}>
            <SearchBar {...{ cities, countries, setCities, setCountries }} />
            <NavBar />
            <Routes>
              <Route path="/" element={<MapRoute {...{ cities, countries, setCities, setCountries }} />}>
              </Route>
              <Route path="/data" element={<DataRoute />}>
              </Route>
              <Route path="/take-action" element={<TakeAction />}>
              </Route>
              <Route path="/about" element={<AboutUs />}>
              </Route>
            </Routes>
            {/* <button onClick={() => sendAQI(55)}>1</button> */}
          </SearchInfoContext.Provider>
        </main>
      </div>
    </Router >
  );
}

export default App;
