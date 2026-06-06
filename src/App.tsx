import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home         from "./pages/Home";
import Sobre        from "./pages/Sobre";
import FAQ          from "./pages/Faq";
import Contato      from "./pages/Contato";
import QuemSomos    from "./pages/QuemSomos";

import Login        from "./pages/auth/Login";
import Cadastro     from "./pages/auth/Cadastro";

import Dashboard    from "./pages/private/Dashboard";
import Alertas      from "./pages/private/Alerta";
import Configuracoes from "./pages/private/Configuracoes";
import FrotaLista   from "./pages/private/FrotaLista";
import SateliteDetalhe from "./pages/private/SateliteDetalhe";

// Guarda de rota
// Verifica autenticação antes de renderizar páginas privadas.
// Atualmente usa sessionStorage("logado") como flag temporário.
//
// Quando a API Quarkus estiver integrada, troque para:
//   const token = localStorage.getItem("token");
//   return token ? <>{children}</> : <Navigate to="/login" replace />;
function RotaPrivada({ children }: { children: React.ReactNode }) {
  const logado =
    sessionStorage.getItem("logado") === "true" ||
    !!localStorage.getItem("token");
  return logado ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* páginas públicas */}
        <Route path="/"           element={<Home />} />
        <Route path="/sobre"      element={<Sobre />} />
        <Route path="/faq"        element={<FAQ />} />
        <Route path="/contato"    element={<Contato />} />
        <Route path="/quemsomos"  element={<QuemSomos />} />

        {/* autenticação */}
        <Route path="/login"    element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* páginas privadas */}
        <Route path="/dashboard"    element={<RotaPrivada><Dashboard /></RotaPrivada>} />
        <Route path="/alertas"      element={<RotaPrivada><Alertas /></RotaPrivada>} />
        <Route path="/frota"        element={<RotaPrivada><FrotaLista /></RotaPrivada>} />
        <Route path="/satelite/:id" element={<RotaPrivada><SateliteDetalhe /></RotaPrivada>} />
        <Route path="/configuracoes" element={<RotaPrivada><Configuracoes /></RotaPrivada>} />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;