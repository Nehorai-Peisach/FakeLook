import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SignIn from 'components/signInUp/SignIn';
import SignUp from './components/signInUp/SignUp';
import NewPost from './components/newPost/NewPost';
import Map from 'components/map/Map';
import Feed from 'components/feed/Feed';
import Profile from 'components/profile/Profile';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/map" element={<Map />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
