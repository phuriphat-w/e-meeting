import './App.css';
import AppRoutes from './config/routes';
import { MockAuthProvider } from './components/MockAuth';

function App() {
  return (
    <MockAuthProvider>
      <AppRoutes />
    </MockAuthProvider>
  )
}

export default App;