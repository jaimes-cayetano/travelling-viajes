import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import { useFonts } from './hooks/useFonts';

export default function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <ProtectedRoute />
    </AuthProvider>
  );
}