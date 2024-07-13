import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Directors from './Director';
import Genres from './Genre';
import Stars from './Star';
import Producers from './Producer';
import Movies from './Movie';
import Layout from './Header';
function App() {
  return (
    <Container>
    <BrowserRouter>
    <Layout/>
     <Routes>
     <Route path="/director" element={<Directors />} />
     <Route path="/producer" element={<Producers />} />
     <Route path="/star" element={<Stars />} />
     <Route path="/genre" element={<Genres />} />
     <Route path="/movie" element={<Movies />} />
  
     </Routes>
    </BrowserRouter>
  </Container>
  );
}

export default App;