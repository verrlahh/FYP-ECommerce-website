import './App.css';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <nav className="navbar">
        <h2>LittleHD</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/">Shop</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
        </div>

        <div className="nav-buttons">
          <button onClick={() => navigate('/login')}>Login</button>
          <button>Cart (0)</button>
        </div>
      </nav>

      <main className="hero">
        <h1>Welcome to LittleHD</h1>
        <p>Your online shopping experience starts here.</p>
        <button className="shop-button">Shop Now</button>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;