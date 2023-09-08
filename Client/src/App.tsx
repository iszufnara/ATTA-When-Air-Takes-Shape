//styles import
import "./styling/App.scss";

// Import statements
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useEffect,
} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MapRoute } from "./routes/MapRoute";
import { InfoPage } from "./routes/InfoPage";
import { LandingPage } from "./routes/LandingPage";
import NavBar from "./components/Navbar";
import SearchBar from "./components/Searchbar";
import { Introduction } from "./routes/Introduction";
import { SearchInfo, SearchInfoContext } from "./contexts/SearchInfoContext";
import { DataHandler, Country, City } from "./model/DataHandler";
import { WindowSize } from "./model/interfaces";
import { WindowContext } from "./contexts/WindowSizeContext";
import { Data, DataContext } from "./contexts/DataContext";
import { BreatheRoute } from "./routes/BreatheRoute";

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
   * data handler, used to obtain data on cities and countries.
   * created using useMemo hook to only initialize it once on the first render of the app.
   */
  const dataHandler = useMemo(() => new DataHandler(), []);

  /**
   * GLOBAL STATES
   */
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [searchInfo, setSearchInfo] = useState<SearchInfo>({
    term: "",
    zoom: 3,
    center: {
      lat: 45.765001, lng: -76.001027
    },
    activeMarker: null,
    datapoint: null
  });
  const [data, setData] = useState<Data>({
    all_data: dataHandler.getData(),
    city_countries: dataHandler.getCityCountries(),
    priority_data: dataHandler.getPriorityData(),
    priority_city_countries: dataHandler.getPriorityCityCountries(),
  });

  /**
   * @returns current size of app window
   */
  function getCurrentDimension(): WindowSize {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  /** updates screen size state when called*/
  const updateDimension = () => {
    setScreenSize(getCurrentDimension());
  };

  /** appends event listener to window upon first render.
   * callback updateDimension gets invoked when the event is dispatched.
   * updateDimension updates screenSize state, causing a re-render and before appending a
   * new event listener, the old event listener gets removed due
   */
  useEffect(() => {
    window.addEventListener("resize", updateDimension);
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, []);

  return (
    <Router>
      <div className="app-outer">
        <main>
          <DataContext.Provider value={{ data, setData }}>
            <WindowContext.Provider
              value={{
                windowObject: screenSize,
                setWindowObject: setScreenSize,
              }}
            >
              <SearchInfoContext.Provider value={{ searchInfo, setSearchInfo }}>
                <Routes>
                  <Route path="/map-route" element={<MapRoute />}></Route>
                  <Route path="/" element={<LandingPage />}></Route>
                  <Route path="/intro" element={<Introduction />}></Route>
                  <Route path="/info-page" element={<InfoPage />}></Route>
                  <Route path="/breathe-page" element={<BreatheRoute />}></Route>
                </Routes>
                {/* <button onClick={() => sendAQI(55)}>1</button> */}
              </SearchInfoContext.Provider>
            </WindowContext.Provider>
          </DataContext.Provider>
        </main>
      </div>
    </Router>
  );
}

export default App;
