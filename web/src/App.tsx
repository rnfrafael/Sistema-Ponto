import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/";
import About from "./pages/About/About";

import BaterPonto from "./pages/BaterPonto/BaterPonto";
import FormCadastroPessoa from "./pages/FormCadastroPessoa";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
function App() {
  return (
    <div className="flex h-screen flex-col bg-gray-600">
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

//const { navigate } = useNavigation();
// () => navigate("routeName")

export default App;
