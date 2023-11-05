import {Route, Routes, Navigate } from 'react-router-dom';

import Landing from './pages/landing';
import Signup from './components/signup';
import Login from './components/login';
import Profile from './pages/profile';
import Questions from './pages/Questions';
import Single from './pages/single';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const user = localStorage.getItem("token")
  return (
    <div className="App">
      <Routes>
        {user && <Route path='/' exact element={<Landing />} />}
        <Route path='/landing' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' exact element={<Navigate replace to="/login" />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/question' element={<Questions/>}/>
        <Route path='/single' element={<Single/>}/>
      </Routes>
    </div>
  );
}

export default App;
