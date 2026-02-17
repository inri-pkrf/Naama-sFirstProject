import Home from './componentsJsx/home.jsx';
import Map from './componentsJsx/map.jsx';
import PlaceInfo from './componentsJsx/placeInfo.jsx';
import Summary from './componentsJsx/summary.jsx';
import GameTwo from './componentsJsx/gameTwo.jsx';
import GueseWho from './componentsJsx/gueseWho.jsx';
import PuzzleReveal from './componentsJsx/puzzleReveal.jsx';
import GamesIntro from './componentsJsx/gamesIntro.jsx';
import './App.css';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  const [placeIndex, setPlaceIndex] = useState(0);
  const [placeGlow, setPlaceGlow] = useState(0);

  const resetMap = () => {
  setPlaceIndex(0);
  setPlaceGlow(0);
};

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/map' element={<Map placeIndex={placeIndex} setPlaceIndex={setPlaceIndex} placeGlow={placeGlow} setPlaceGlow={setPlaceGlow}/>}/>
        <Route path='/place/:id' element={<PlaceInfo/>}/>
        <Route path='/gamesIntro' element={<GamesIntro/>}/>
        <Route path='/game1' element={<GameTwo/>}/>
        <Route path='/game2' element={<GueseWho/>}/>
        <Route path="/game3" element={<PuzzleReveal />} />
        <Route path='/summary' element={<Summary resetMap={resetMap}/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
