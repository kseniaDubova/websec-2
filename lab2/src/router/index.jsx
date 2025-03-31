import {Routes, Route } from "react-router-dom";
import Home from '../views/Home.jsx'
import OneStop from "../views/OneStop.jsx";
import TwoStops from "../views/TwoStops.jsx";

function AppRouter({stations}) {
  return (
        <Routes>
            <Route path="/" element={<Home stations={stations} />} />
            <Route path="/one-stop" element={<OneStop />} />
            <Route path="/two-stops" element={<TwoStops stations={stations}/>} />
        </Routes>
  );
}

export default AppRouter;