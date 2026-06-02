import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Faq from "./pages/Faq";
import Contato from "./pages/Contato";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/sobre"       element={<Sobre/>} />
        <Route path="/faq"         element={<Faq/>} />
        <Route path="/contato"     element={<Contato/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;