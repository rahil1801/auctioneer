import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar';
import OpenRoute from './components/core/Auth/OpenRoute';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import About from './pages/About';
import Auctions from './pages/Auctions';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';

const App = () => {
    return(
        <div className='p-5 w-screen min-h-screen relative flex flex-col gap-5 bg-[#F2EFE7]'>
            <Navbar />
            
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/auctions' element={<Auctions />} />
                <Route path='/contact' element={<Contact />} />

                <Route path='/login' element={
                    <OpenRoute>
                        <LoginPage />
                    </OpenRoute>
                }/>

                <Route path='/signup' element={
                    <OpenRoute>
                        <SignupPage />
                    </OpenRoute>
                } />

                <Route element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }> 
                    {/* Outlet routes will come here */}
                    <Route path='dashboard/my-profile' element={<MyProfile />}/>
                </Route>
            </Routes> 
        </div>
    )
};

export default App;
