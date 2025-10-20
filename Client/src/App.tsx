import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestePlacar from "./Pages/TestePlacar";
import Qualificacao from "./Pages/Qualificacao/Qualificacao";
import Resultado from "./Pages/Resultados/Resultado"; // Adjust the path if necessary
import Partida from "./Pages/Partida/Partida";
import Home from "./Pages/Juiz/Home";
import Pontuacao from "./Pages/Juiz/Pontuacao";
import { ToastContainer } from "react-toastify";
import FormPartida from "./Pages/FormPartida";
function App() {
  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/game" element={<TestePlacar />} />
          <Route path="/" element={<Home />} />
          <Route path="/classificacao" element={<Qualificacao />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/partida" element={<Partida />} />
          <Route path="/partida/:id/placar" element={""} />
          <Route path="/partida/:id/aliancas" element={<Pontuacao />} />

          <Route path="/partida/nova" element={<FormPartida />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
