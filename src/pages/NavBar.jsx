import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove doctorId and doctorName from localStorage
    localStorage.removeItem('doctorId');
    localStorage.removeItem('doctorName');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li>
          <Link to="/home" style={styles.link}>
            <button style={styles.button}>Home</button>
          </Link>
        </li>
        <li>
          <Link to="/doctor/profile" style={styles.link}>
            <button style={styles.button}>Profile</button>
          </Link>
        </li>
        <li>
          <Link to="/register" style={styles.link}>
            <button style={styles.button}>Register Page</button>
          </Link>
        </li>
        <li>
          <Link to="/patients" style={styles.link}>
            <button style={styles.button}>New Patient</button>
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </li>
        <li style={styles.doctorId}>{localStorage.getItem('doctorId')}</li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '15px',
    color: '#fff',
  },
  ul: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  doctorId: {
    fontStyle: 'italic',
  },
};

export default NavBar;
