import './App.css';
import { UnicornProvider } from './context/UnicornContext';
import UnicornsModule from './layouts/unicorns';

function App() {
  return (
      <UnicornProvider>
        <UnicornsModule/>
      </UnicornProvider>
  );
}

export default App;