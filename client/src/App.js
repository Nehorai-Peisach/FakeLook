import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SignIn from './components/signInUp/SignIn';
import SignUp from './components/signInUp/SignUp';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
