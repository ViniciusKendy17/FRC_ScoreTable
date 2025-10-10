import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestePlacar from "./Pages/TestePlacar";
import TesteJuiz from "./Pages/TesteJuiz";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/game" element={<TestePlacar />} />
          <Route path="/judge" element={<TesteJuiz />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
