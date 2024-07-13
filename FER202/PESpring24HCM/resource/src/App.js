import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import HeaderMenu from "./components/HeaderMenu";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";
import Detail from "./components/Detail";
import CreateSection from "./components/CreateSection";
import UpdateSection from "./components/UpdateSection";

function App() {
  return (
    <Router>
      <HeaderMenu />

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create_section" element={<CreateSection />} />
          <Route path="/update_section/:id" element={<UpdateSection />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
