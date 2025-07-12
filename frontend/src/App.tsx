import { RootNavigation } from './components/navigation';
import { AppThemeProvider, StoreProvider, ToastProvider } from './providers';

function App() {
  return (
    <AppThemeProvider>
      <StoreProvider>
        <RootNavigation />
        <ToastProvider />
      </StoreProvider>
    </AppThemeProvider>
  );
}

export default App;
