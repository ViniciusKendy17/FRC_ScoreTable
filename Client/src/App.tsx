import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestePlacar from "./Pages/TestePlacar";
import TesteJuiz from "./Pages/TesteJuiz";
import Qualificacao from "./Pages/Qualificacao/Qualificacao";
import Resultado from "./Pages/Resultados/Resultado"; // Adjust the path if necessary
import Partida from './Pages/Partida/Partida';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/game" element={<TestePlacar />} />
          <Route path="/judge" element={<TesteJuiz />} />
          <Route path="/qualificacao" element={<Qualificacao />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/partida" element={<Partida />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
