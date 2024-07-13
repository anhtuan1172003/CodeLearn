// "scripts": {
//   "start": "node your_custom_start_script.js"
// }
// const { exec } = require('child_process');

// exec('react-scripts start', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     return;
//   }
//   console.log(stdout);
// });

import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Stars from './Star';
import Movies from './Movie';
import Directors from './Director';

const Layout = () => {

  return(
    <nav style={{textAlign:'center', height:'60px', fontSize:'20px'}}>
      <h1 style={{textAlign:'center', marginBottom:'30px'}}>Dashboard</h1>
      <Link to="/director" class="btn btn-success" style={{width : '100px', color:'white', textDecoration:'none', marginRight:'70px' }}>Directors</Link>
      <Link to="/producer" class="btn btn-info" style={{width : '100px',color:'white', textDecoration:'none', marginRight:'70px'}}> Producers</Link>
      <Link to="/star" class="btn btn-danger" style={{width : '80px',color:'white', textDecoration:'none', marginRight:'70px'}}> Stars</Link>
      <Link to="/genre" class="btn btn-secondary" style={{width : '90px',color:'white', textDecoration:'none', marginRight:'70px'}}> Genres</Link>
      <Link to="/movie" class="btn btn-warning" style={{width : '90px',color:'black', textDecoration:'none', marginRight:'70px'}}> Movies</Link>
    </nav>
);
};

// const Producers = () => <div>Producers Page</div>
// const Genres = () => <div>Genres Page</div>

// const Header = () => {
  
//   return (
    
//     <Router>
//       <Layout />
//       <Routes>
//         <Route path="/director" element={<Directors />} />
//         <Route path="/producer" element={<Producers />} />
//         <Route path="/star" element={<Stars />} />
//         <Route path="/genre" element={<Genres />} />
//         <Route path="/movie" element={<Movies />} />

//       </Routes>     
//     </Router>
//   );
//   };

export default Layout;
