import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Faq from "./pages/Faq";
import Contato from "./pages/Contato";
import QuemSomos from "./pages/QuemSomos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── páginas públicas ── */}
        <Route path="/"            element={<Home />} />
        <Route path="/sobre"       element={<Sobre />} />
        <Route path="/faq"         element={<Faq />} />
        <Route path="/contato"     element={<Contato />} />
        <Route path="/quemsomos" element={<QuemSomos />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;