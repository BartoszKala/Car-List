import { NavLink } from 'react-router-dom';


export default function Menu() {
  localStorage.removeItem('token');
  return (
    
    <div className="menu-container">
      <div className="button-group">
        <NavLink to="account/login" className="menu-button">
          Login
        </NavLink>
        <NavLink to="account/register" className="menu-button">
          Register
        </NavLink>
      </div>
    </div>
  );
}
