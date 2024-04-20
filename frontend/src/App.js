// App.js
import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/home';
import Labs from './pages/labs';
import Meds from './pages/meds';
import Msgs from './pages/msgs';
import Sidebar from './components/sidebar'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/labs" element={<Labs />}></Route>
          <Route path="/meds" element={<Meds />}></Route>
          <Route path="/msgs" element={<Msgs />}></Route>
        </Routes>
        <Sidebar />
      </BrowserRouter>
    </>
  );
}

export default App;
