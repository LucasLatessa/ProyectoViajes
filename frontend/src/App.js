import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { CreateViaje } from "./components/Home/Viaje/createViaje";
import { Profile } from "./components/Profile/profile";
import { About } from "./components/AboutAs/about";
import { Contact } from "./components/Contact/contact";
import ViajePage from "./components/Home/Viaje/viajePage";
import Postulaciones from "./components/Profile/postulaciones";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateViaje />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/viaje/:id" element={<ViajePage />} />
        <Route path="/viaje/:id/postulaciones" element={<Postulaciones />} />
      </Routes>
    </Router>
  );
}

export default App;
