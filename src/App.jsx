
import './App.css'
import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//page
import AddActivity from './pages/addactivity'
import Login from './pages/login'
import EditActivity from './pages/editactivity'
import Profile from './pages/profile'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import EditProfile from './pages/editprofile'
import {useContext,createContext} from 'react'


const CollectContext = createContext();


function App() {
// test
  const RouteNaja = () => (
          <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={localStorage.token ? <Dashboard /> : <Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={localStorage.token ? <Dashboard /> : null} />
                <Route path="/addActivity" element={localStorage.token ? <AddActivity /> : null} />
                <Route path="/editActivity/:id" element={localStorage.token ? <EditActivity /> : null} />
                <Route path="/editProfile" element={localStorage.token ? <EditProfile /> : null} />
                <Route path="/profile" element={localStorage.token ? <Profile /> : null} />
            </Routes>
          </Router>             
  )


  useEffect(() => {
    // This function will be called whenever the value of date1 or date2 changes
    // console.log('The difference between the selected dates has changed');
  }, [localStorage.token]);
  return (
    <div className="App">
      <RouteNaja />
      {/* <Router>
        <NavBar />
        <Routes> */}
        
            
          {/* <Route path="/" element={localStorage.token ? <Dashboard /> : <Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={localStorage.token ? <Dashboard /> : null} />
          <Route path="/addActivity" element={localStorage.token ? <AddActivity /> : null} />
          <Route path="/editActivity/:id" element={localStorage.token ? <EditActivity /> : null} />
          <Route path="/editProfile" element={localStorage.token ? <EditProfile /> : null} />
          <Route path="/profile" element={localStorage.token ? <Profile /> : null} /> */}
          
        {/* </Routes>
      </Router> */}
    </div>
  )
}

export default App
