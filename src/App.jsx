import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AppProviders from './providers';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <Navigate
                to="/home"
                replace={true}
              />
            }
          />
          <Route
            index
            path="home"
            element={<HomePage />}
          />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
