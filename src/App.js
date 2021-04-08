import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import NoFound from './Components/NoFound/NoFound';
import Admin from './Components/Admin/Admin';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';
import CheckOut from './Components/CheckOut/CheckOut';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';

export const UserContext = createContext();

function App() {
   const [loggedInUser, setLoggedInUser] = useState();
   return (
      <div className="home">
         <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <Router>
               <Header />
               <Switch>
                  <Route exact path="/">
                     <Home />
                  </Route>
                  <Route path="/home">
                     <Home />
                  </Route>
                  <Route path="/placeOrder">
                     <PlaceOrder />
                  </Route>
                  <PrivateRoute path="/admin">
                     <Admin />
                  </PrivateRoute>
                  <PrivateRoute path="/order">
                     <PlaceOrder />
                  </PrivateRoute>
                  <Route path="/login">
                     <Login />
                  </Route>
                  <PrivateRoute path="/product/:id">
                     <CheckOut />
                  </PrivateRoute>
                  <Route path="*">
                     <NoFound />
                  </Route>
               </Switch>
            </Router>
         </UserContext.Provider>
      </div>
   );
}

export default App;
