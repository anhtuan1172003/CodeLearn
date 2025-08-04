import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./Movie";
import MovieAddstar from "./MovieAddstar";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/movie' element={<Movies />} />
        <Route path='/movie/:id/add-stars' element={<MovieAddstar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;