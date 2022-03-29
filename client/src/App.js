import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from 'components/app/Main';
import Login from 'components/login/Login';
import NewFriendGroup from 'components/app/friendGroup/NewFriendGroup';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<Main />} />
          <Route path="/fg" element={<NewFriendGroup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
