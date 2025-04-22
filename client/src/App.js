import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from './Components/StartPage/Start.jsx';
import Auth from './Components/AuthPage/Auth.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Courses from './Components/Profile/Courses.jsx';
import Grades from './Components/Profile/Grades.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/auth' element={<Auth />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/grades' element={<Grades />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;