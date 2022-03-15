import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/login/Login';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
