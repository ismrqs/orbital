import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import FAQ from "./pages/Faq";
import Contato from "./pages/Contato";
import QuemSomos from "./pages/QuemSomos";
import Dashboard from "./pages/private/Dashboard";
import Alertas from "./pages/private/Alerta";
import Configuracoes from "./pages/private/Configuracoes";
import FrotaLista from "./pages/private/FrotaLista";
import SateliteDetalhe from "./pages/private/SateliteDetalhe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── páginas públicas ── */}
        <Route path="/"            element={<Home />} />
        <Route path="/sobre"       element={<Sobre />} />
        <Route path="/faq"         element={<FAQ />} />
        <Route path="/contato"     element={<Contato />} />
        <Route path="/quemsomos" element={<QuemSomos />} />

        {/* páginas privadas */}
        <Route path="/dashboard"     element={<Dashboard />} />
        <Route path="/alertas"       element={<Alertas />} />
        <Route path="/frota"         element={<FrotaLista />} />
        <Route path="/satelite/:id"  element={<SateliteDetalhe />} />
        <Route path="/configuracoes" element={<Configuracoes />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;