import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokedexPage from "./pages/PokedexPage";
import Navigation from "./components/navigation";
import PokemonPage from "./pages/PokemonPage";
import LandingPage from "./pages/LandingPage";
import TeamBuilderPage from "./pages/TeamBuilderPage";

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pokedex" element={<PokedexPage />} />
        <Route path="/pokedex/:slug" element={<PokemonPage />} />
        <Route path="/team" element={<TeamBuilderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;