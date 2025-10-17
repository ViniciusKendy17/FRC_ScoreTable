import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestePlacar from "./Pages/TestePlacar";
import Qualificacao from "./Pages/Qualificacao/Qualificacao";
import Resultado from "./Pages/Resultados/Resultado"; // Adjust the path if necessary
import Partida from "./Pages/Partida/Partida";
import Home from "./Pages/Juiz/Home";
import Pontuacao from "./Pages/Juiz/Pontuacao";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/game" element={<TestePlacar />} />
          <Route path="/home" element={<Home />} />
          <Route path="/classificacao" element={<Qualificacao />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/partida" element={<Partida />} />
          <Route path="/partida/:id/placar" element={''}/>
          <Route path="/partida/:id/aliancas" element={<Pontuacao/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
