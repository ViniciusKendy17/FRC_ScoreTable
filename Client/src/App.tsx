import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import TestePlacar from "./Pages/TestePlacar";
import Qualificatoria from "./Pages/Qualificacao/Qualificacao";
import Resultado from "./Pages/Resultados/Resultado";
import Partida from "./Pages/Partida/Partida";
import Home from "./Pages/Juiz/Home";
import Pontuacao from "./Pages/Juiz/Pontuacao";
import { ToastContainer } from "react-toastify";
import FormPartida from "./Pages/FormPartida";
import Classificacao from "./Pages/Classificacao/Classificacao";
import Login from "./Pages/Login/Login";
import Resumo from "./Pages/ResumoPartida/Resumo";
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classificacao" element={<Classificacao />} />
          <Route path="/qualificatoria/:id" element={<Qualificatoria />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/partida/:id/placar" element={<Partida />} />
          <Route path="/partida/:id/aliancas" element={<Pontuacao />} />
          <Route path="/partida/nova" element={<FormPartida />} />
          <Route path="/qualificatoria" element={<Qualificatoria />} />
          <Route path="/resultado/:id" element={<Resultado />} />
          <Route path="/login" element={<Login />} />
          <Route path="/overall/:id" element={<Resumo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
