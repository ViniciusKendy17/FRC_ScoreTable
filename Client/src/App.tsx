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
import TesteJuiz from "./Pages/TesteJuiz";
// import Home from "./Pages/Juiz/Home";
// import Pontuacao from "./Pages/Juiz/Pontuacao";
import Classificacao from "./Pages/Classificacao/Classificacao";
function App() {
  return (
    <>
    <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/game" element={<TesteJuiz/>} />
          <Route path="/" element={<Home />} />
          <Route path="/classificacao" element={<Classificacao />} />
          <Route path="/qualificatoria/:id" element={<Qualificatoria />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/partida" element={<Partida />} />
          <Route path="/partida/:id/placar" element={""} />
          <Route path="/partida/:id/aliancas" element={<Pontuacao />} />

          <Route path="/partida/nova" element={<FormPartida />} />
          {/* <Route path="/game" element={<TestePlacar />} />
          <Route path="/home" element={<Home />} /> */}
          {/*   <Route path="/partida/:id/placar" element={''}/>
          <Route path="/partida/:id/aliancas" element={<Pontuacao/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
