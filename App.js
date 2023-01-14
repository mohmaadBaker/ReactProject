import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/Contextfile';

function App() {
  const contexts = useContext(AuthContext)
  return (
    <Layout>
      <BrowserRouter>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!contexts.isLogin && <Route Route path='/auth'>
          <AuthPage />
        </Route>
        }
        <Route path='/profile'>
          {contexts.isLogin &&
            <UserProfile />}
          {!contexts.isLogin && <Redirect to='/auth' />}
        </Route>

        <Route path='*' ><Redirect to='/' /></Route>
      </BrowserRouter>
    </Layout >
  );
}

export default App;
