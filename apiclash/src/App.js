import './App.css';
import HomeComponent from "./components/HomeComponent";
import ClansLocation from "./components/ClansLocation";
import PlayersLocation from "./components/PlayersLocation";
import HeaderComponent from './components/HeaderComponent';
import ClansTag from './components/ClansTag';
import PlayersTag from './components/PlayersTag';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
            <HeaderComponent />
            <Routes>
                <Route path="/" element={<HomeComponent />}/>
                <Route path="/locations/:id/rankings/clans" element={<ClansLocation />}/>
                <Route path="/locations/:id/rankings/players" element={<PlayersLocation />}/>
                <Route path="/clans/:tag" element={<ClansTag />}/>
                <Route path="/players/:tag" element={<PlayersTag />}/>
            </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
