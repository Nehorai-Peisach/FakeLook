import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from 'components/app/Main';
import { useState } from 'react';
import Login from 'components/login/Login';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
