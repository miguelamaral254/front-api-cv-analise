// src/App.jsx

import AppRoutes from './routes/AppRoutes.jsx'; // Caminho ajustado
import ScrollToTopButton from './components/global/ScrollToTopButton';
import NavBar from './components/Navbar.jsx';

function App() {
  return (
    <div className="">
      <NavBar />
      <AppRoutes />
      <ScrollToTopButton />
    </div>
  );
}

export default App;