import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SignIn from './components/signInUp/SignIn';
import SignUp from './components/signInUp/SignUp';
import NewPost from './components/newPost/NewPost'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='new-post' element={<NewPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
