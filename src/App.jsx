// src/App.jsx

import AppRoutes from "./routes/AppRoutes.jsx";
import ScrollToTopButton from "./components/global/ScrollToTopButton";
import NavBar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="bg-body">
      <NavBar />
      <AppRoutes />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
