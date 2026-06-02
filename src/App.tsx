import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Faq from "./pages/Faq";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/sobre"       element={<Sobre/>} />
        <Route path="/faq"         element={<Faq/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;