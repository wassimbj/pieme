import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
// Context
import { AuthProvider} from './helpers/AuthContext';

// Components
import Navbar from './components/navbar/Navbar';

// Pages
import Home from './pages/Home';
import AddProject from './pages/AddProject';
import Login from './pages/Login';


function App() {

    let GET_IS_AUTH = gql`
        {
            isauth
        }
    `;

  let {loading, data} = useQuery(GET_IS_AUTH);

  return (
    <AuthProvider value={{isauth: data?.isauth, loading}}>
      <Router>
        <div>
          <Navbar />

          <div className='container mt-20 px-2 pb-20'>
            <Switch>

              <Route exact path='/' component={Home} />  

              <Route exact path='/add-project' component={AddProject} />  

              <Route exact path='/login' component={Login} />  

            </Switch>        
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
