import React, { Suspense } from 'react';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import { useSelector } from 'react-redux';
import LineLoader from './components/LineLoader'
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
        <Router isLoggedIn={isLoggedIn()} role={profile?.role} />
      </Suspense>
    </ThemeConfig>
  );
}

export default App;
