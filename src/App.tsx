import { Routes, Route, useLocation } from 'react-router-dom';
import { Grid, CircularProgress, CssBaseline } from '@mui/material';
import { initReactI18next } from 'react-i18next';
import { Suspense, lazy } from 'react';
import bg from './locals/bg.json';
import en from './locals/en.json';
import i18next from 'i18next';
import NavBar from './components/NavBar/NavBar';

const Home = lazy(() => import('./page/Home'));
const UserLogin = lazy(() => import('./page/userLogin'));
const UserSignup = lazy(() => import('./page/userSignup'));
const ChatMenu = lazy(() => import('./page/ChatMenu'));

i18next.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    bg: {translation: bg}
  },
  lng: document.querySelector('html')?.lang || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== '/user/login' && location.pathname !== '/user/registration';

  return (
    <Suspense fallback={
      <Grid container direction="column" justifyContent="center" alignItems="center" height={'100vh'}>
        <CircularProgress style={{color: '#696cff'}}/>
      </Grid>
    }>
      {showNavBar && <NavBar/>}
      <CssBaseline/>
      <Routes>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/user/login' element={<UserLogin/>}></Route>
        <Route path='/user/registration' element={<UserSignup/>}></Route>
        <Route path='/user/messages' element={<ChatMenu/>}></Route>
        <Route path='*' element={<Home/>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
