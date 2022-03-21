import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/login/Login';
import NewPost from './components/newPost/NewPost';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/new-post" element={<NewPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
