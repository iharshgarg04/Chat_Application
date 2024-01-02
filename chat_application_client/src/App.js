import { Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Navbar from './pages/Navbar/Navbar';
import Signup from './pages/Signup/Signup';
import MainContainer from './Components/Main/MainContainer';
import Welcome from './Components/welcome/Welcome';
import ChatArea from './Components/chatArea/ChatArea';
import Creategroup from './Components/welcome/Creategroup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>} />
        </Route>
        <Route path='app' element={<MainContainer/>} >
            <Route path='welcome' element={<Welcome/>} />
            <Route path='chat' element={<ChatArea/>} />
            <Route path='create-groups' element={<Creategroup/>} />
            {/* <Route path='welcome' element={<Welcome/>} /> */}
        </Route>
      </Routes>
    </div>
  );
}


export default App;
