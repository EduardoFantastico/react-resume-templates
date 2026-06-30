/*
Purpose: Application root that forwards rendering to the router.
Props summary: none.
Usage example: <App />
*/
import { AppRouter } from '@/router/AppRouter';

/**
 * Root application component.
 */
export function App() {
  return <AppRouter />;
}
