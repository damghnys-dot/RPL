import { BrowserRouter } from 'react-router';
import AppRoutes from './routes';
import MobileContainer from '../components/MobileContainer';
import { ThemeProvider } from '../context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MobileContainer>
          <AppRoutes />
        </MobileContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
