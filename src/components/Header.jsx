import './Header.css';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="main-header">
      <img src={logo} alt="A list" />
      <h1>Today's Task</h1>
    </header>
  );
}

export default Header;
