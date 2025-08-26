import AppRoutes from './routes.jsx';
import ScrollToTopButton from './components/global/ScrollToTopButton';

function App() {
  return (
    <div className="p-8">
      <h1 className="text-5xl font-bold mb-8">Plataforma de Candidaturas</h1>
      <AppRoutes />
      <ScrollToTopButton />
    </div>
  );
}

export default App;