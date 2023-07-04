import './App.css';
import {Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import axios  from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
//import { NoteContextProvider } from '../context/noteContext';
//import Dashboard from './pages/Dashboard';
import NotesPage from './components/Notes/NotesPage';

axios.defaults.baseURL = 'https://notesapp-backend-u0ue.onrender.com';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
         
      <Navbar />
      <Toaster position="top-center" toastOptions={{duration: 3000}} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/notes' element={<NotesPage />} />
      </Routes> 
      
    </UserContextProvider>
  );
}

export default App; 
