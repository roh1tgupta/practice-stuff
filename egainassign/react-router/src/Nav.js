import './App.css';
import { Link } from 'react-router-dom';
function Nav() {
    const navStyle = {
        color: 'white'
    }
    return (
    <nav>
        <h1>eGain</h1>
        
        <ul className='nav-links'>
            <Link to="/home" style={{color: 'white'}}>Home</Link>
            <Link to="/about" style={{color: 'white'}}>Abount</Link>
            <Link to="/shop" style={{color: 'white'}}>Shop</Link>
        
        </ul>
    </nav>
  );
}
  
export default Nav;