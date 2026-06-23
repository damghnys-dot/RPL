import { BrowserRouter } from 'react-router';
import AppRoutes from './routes';
import MobileContainer from '../components/MobileContainer';

function App() {
  return (
    <BrowserRouter>
      <MobileContainer>
        <AppRoutes />
      </MobileContainer>
    </BrowserRouter>
  );
}

export default App;
