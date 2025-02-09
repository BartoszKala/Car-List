import './styles/App.css';
import './styles/Header.css';
import './styles/Card.css';
import './styles/CarDetails.css'
import './styles/CarEdit.css'
import './styles/Login.css';
import './styles/Register.css';
import './styles/Menu.css';
import { Outlet } from 'react-router-dom';
import NavBar from './Functions/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
