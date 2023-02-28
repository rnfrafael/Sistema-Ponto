import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";

import BaterPonto from "./pages/BaterPonto/BaterPonto";
import FormCadastroPessoa from "./pages/FormCadastroPessoa";
import Home from "./pages/Home";
import Login from "./pages/Login";
function App() {
  return (
    <div className="flex h-screen flex-col">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bater-ponto" element={<BaterPonto />} />
          <Route path="/cadastrar-pessoa" element={<FormCadastroPessoa />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
