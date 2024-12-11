import './App.css';
import './styles/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/Home/Home';
import LoginPage from './pages/Auth/Login';
import ChannelPage from './pages/Channel/Channel';
import RegisterPage from './pages/Auth/Register';
import Auth from './pages/Auth/Auth';

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/*' element={<Auth />} />
        <Route path='/channels/:serverId/' element={<ChannelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
