import { Suspense } from 'react';
import './App.scss';
import { ErrorBoundary } from './Error/ErrorBoundary';
import Router from './Routes/Router';
import Loader from './components/UI/Loaders/Loader';
import AppContextProvider from './store/app/app-context.provider';
import UserContextProvider from './store/user/user-context.provider';

function App() {
  return (
    <>
      <AppContextProvider>
        <UserContextProvider>
          <ErrorBoundary>
            <Suspense fallback={<Loader />} >
              <Router />
            </Suspense>
          </ErrorBoundary>
        </UserContextProvider>
      </AppContextProvider>
    </>
  );
}

export default App;
