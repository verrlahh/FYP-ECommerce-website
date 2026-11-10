import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h2>LittleHD</h2>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/">Shop</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
        </div>

        <div className="nav-buttons">
          <button>Login</button>
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

export default App;

