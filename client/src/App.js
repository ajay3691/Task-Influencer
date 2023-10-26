import React from 'react';
import Navbar from './Navabr/Navbar';
import Admin from './ProductCompo/Admin';
import CreateMark from './ProductCompo/CreateMark';
import EditMark from './ProductCompo/EditMark';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-mark" element={<CreateMark />} />
          <Route path="/edit-mark/:id" element={<EditMark />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
