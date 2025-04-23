import '../Components/Header.css'
import logo from '../assets/1200px-SAPS_badge.svg.png'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header-container'>
      <div className="header">
        <img src={logo} alt="" width="40px" />
        <h3>My Saps Finder</h3>
      </div>
      <div className="about">
          <Link to='/about'>
            <h3>About the App</h3>
          </Link>
      </div>
    </div>
  )
}

export default Header