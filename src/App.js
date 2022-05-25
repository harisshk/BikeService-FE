import React, { Suspense } from 'react';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import { useSelector } from 'react-redux';
import LineLoader from './components/LineLoader'
import { BrowserRouter } from 'react-router-dom';
// ----------------------------------------------------------------------

function App() {
  const profile = useSelector(state => state?.profile)
  const isLoggedIn = () => {
    if (profile?.token) {
      return true
    } else {
      return false
    }
  }
  return (
    <ThemeConfig>
      <GlobalStyles />
      <Suspense fallback={<LineLoader />}>
        <BrowserRouter>
          <Router isLoggedIn={isLoggedIn()} role={profile?.role} />
        </BrowserRouter>
      </Suspense>
    </ThemeConfig>
  );
}

export default App;
