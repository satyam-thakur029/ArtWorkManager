import ArtworkManager from './components/ArtworkManager';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => {
  return (
    <div className="app-container w-screen h-screen flex flex-col">
      <ArtworkManager />
    </div>
  );
};

export default App;