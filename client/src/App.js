import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from './Components/StartPage/Start.jsx';
import Auth from './Components/AuthPage/Auth.jsx';
import Profile from './Components/Profile/Profile.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;