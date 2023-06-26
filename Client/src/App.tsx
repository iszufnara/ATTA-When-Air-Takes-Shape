//styles import 
import './App.css';

// Import statements
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MapRoute } from './routes/MapRoute';
import { AboutUs } from './routes/AboutUs';
import { DataRoute } from './routes/DataRoute';
import NavBar from './components/Navbar';
import SearchBar from './components/Searchbar';
import { TakeAction } from './routes/TakeAction';

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
  

function sendAQI(aqi: number) {
  fetch('http://localhost:3001/aqi?value='+aqi, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',

  },
})
  .then(res => res.json());
}

  return (
    <Router>
      <div>
        <main>
          <SearchBar />
          <NavBar />
          <Routes>
            <Route path="/" element={<MapRoute />}>
            </Route>
            <Route path="/data" element={<DataRoute />}>
            </Route>
            <Route path="/take-action" element={<TakeAction />}>
            </Route>
            <Route path="/about" element={<AboutUs />}>
            </Route>
          </Routes>
          
          <button onClick={() => sendAQI(55)}>1</button>

        </main>
      </div>
    </Router>
  );
}

export default App;
